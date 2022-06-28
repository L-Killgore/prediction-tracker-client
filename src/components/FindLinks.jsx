import React from 'react';

const FindLinks = ({ text, component }) => {
  const parsedLinks = text.match(/(?:http|www\.).+?(?=[.,;:?!-]?(?:\s|$))/g);
  const parsedReason = [];

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
    <>
      {component === "comment" ? 
        (
          <p className="col mt-2 text-start">
            {parsedReason ? parsedReason : text}
          </p>
        )
        :
        (
          <ul className="col mt-2 text-start">
            <li>{parsedReason ? parsedReason : text}</li>
          </ul>
        )
      }
    </>
  )
}

export default FindLinks