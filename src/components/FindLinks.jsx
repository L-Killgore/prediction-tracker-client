import React from 'react';
import { useLocation } from 'react-router-dom';

const FindLinks = ({ text }) => {
  const parsedLinks = text.match(/(?:http|www\.).+?(?=[.,;:?!-]?(?:\s|$))/g);
  const parsedReason = [];
  let location = useLocation();
  console.log(location.pathname);

  if (parsedLinks) {
    parsedLinks.forEach(link => {
      const [t1, ...t2] = text.split(link);
      parsedReason.push(t1);
      text = t2.join(link);
      const httpsLink = (!(link.match(/(http(s?)):\/\//)) ? 'https://' : '') + link;
      // get a key for <a> tags that is most likely unique
      let keyVal = (httpsLink.charCodeAt(9) + httpsLink.charCodeAt(10));
      parsedReason.push(<a key={keyVal} href={httpsLink} target="_blank" rel="noreferrer">{httpsLink}</a>);
    });
  };

  parsedReason.push(text)

  return (
    <p className="col mt-2 text-start">
      {parsedReason ? parsedReason : text}
    </p>
  )
}

export default FindLinks