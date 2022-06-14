import React from 'react';

const FindLinks = ({ keyVal, reason }) => {
  // https://stackoverflow.com/questions/49634850/convert-plain-text-links-to-clickable-links/71734086#71734086
  const parsedLinks = reason.match(/(?:http|\S+\.\S).+?(?=[.,;:?!-]?(?:\s|$))/g);
  const parsedReason = [];

  if (parsedLinks) {
    parsedLinks.forEach(link => {
      const [t1, ...t2] = reason.split(link);
      parsedReason.push(t1);
      reason = t2.join(link);
      const httpsLink = (!(link.match(/(http(s?)):\/\//)) ? 'https://' : '') + link;
      parsedReason.push(<a href={httpsLink} target="_blank" rel="noreferrer">{httpsLink}</a>);
    });
  };

  parsedReason.push(reason)

  return (
    <p key={keyVal} className="col mt-2 text-start">
      {parsedReason ? parsedReason : reason}
    </p>
  )
}

export default FindLinks