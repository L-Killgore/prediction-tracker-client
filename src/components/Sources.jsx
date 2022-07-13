import React from 'react'
import { format, parseISO } from 'date-fns';

import FindLinks from './FindLinks';

const Sources = ({ key, source }) => {
  let author_list = "";
  let edition = "";
  let volume = "";
  let issue = "";
  let pages = "";
  let database_name = "";
  let uploader_name = "";
  let url = "";

  // formatting author list
  if (source.author1_last && !source.author1_initial && !source.author1_first) {
    author_list = `${source.author1_last}. `;

    if (source.et_al) {
      author_list = `${source.author1_last}, et al.`
    } else if (source.author2_last && !source.author2_initial && !source.author2_first) {
      author_list = `${source.author1_last}, and ${source.author2_last}. `;
    } else if (source.author2_last && !source.author2_initial && source.author2_first) {
      author_list = `${source.author1_last}, and ${source.author2_first} ${source.author2_last}. `;
    } else if (source.author2_last && source.author2_initial && source.author2_first) {
      author_list = `${source.author1_last}, and ${source.author2_first} ${source.author2_initial}. ${source.author2_last}. `;
    };

  } else if (source.author1_last && !source.author1_initial && source.author1_first) {
    author_list = `${source.author1_last}, ${source.author1_first}. `;

    if (source.et_al) {
      author_list = `${source.author1_last}, ${source.author1_first}, et al.`
    } else if (source.author2_last && !source.author2_initial && !source.author2_first) {
      author_list = `${source.author1_last}, ${source.author1_first}, and ${source.author2_last}. `;
    } else if (source.author2_last && !source.author2_initial && source.author2_first) {
      author_list = `${source.author1_last}, ${source.author1_first}, and ${source.author2_first} ${source.author2_last}. `;
    } else if (source.author2_last && source.author2_initial && source.author2_first) {
      author_list = `${source.author1_last}, ${source.author1_first}, and ${source.author2_first} ${source.author2_initial}. ${source.author2_last}. `;
    };

  } else if (source.author1_last && source.author1_initial && source.author1_first) {
    author_list = `${source.author1_last}, ${source.author1_first} ${source.author1_initial}. `;

    if (source.et_al) {
      author_list = `${source.author1_last}, ${source.author1_first} ${source.author1_initial}., et al.`
    } else if (source.author2_last && !source.author2_initial && !source.author2_first) {
      author_list = `${source.author1_last}, ${source.author1_first} ${source.author1_initial}., and ${source.author2_last}. `;
    } else if (source.author2_last && !source.author2_initial && source.author2_first) {
      author_list = `${source.author1_last}, ${source.author1_first} ${source.author1_initial}., and ${source.author2_first} ${source.author2_last}. `;
    } else if (source.author2_last && source.author2_initial && source.author2_first) {
      author_list = `${source.author1_last}, ${source.author1_first} ${source.author1_initial}., and ${source.author2_first} ${source.author2_initial}. ${source.author2_last}. `;
    };
    
  };

  // formatting other citation data
  if (source.edition) {
    edition = `${source.edition} ed.,`; // fix to make ordinals
  };
  if (source.volume) {
    volume = `vol. ${source.volume},`;
  };
  if (source.issue) {
    issue = `no. ${source.issue},`;
  };
  if (source.pages) {
    pages = `pp. ${source.pages}.`;
  };
  if (source.database_name) {
    database_name = `${source.database_name},`;
  };
  if (source.uploader_name) {
    uploader_name = `uploaded by ${source.uploader_name},`;
  };
  if (source.url) {
    url = `${source.url}.`
  };

  return (
    <p className="col text-start"> 
      {
        source.source_type === "basic" ?
          <small><i>{source.publisher_name}</i>, <FindLinks key={key} text={url} component={"source"} /></small>
        :
        source.source_type === "book" ?
          <small>
            {author_list} <i>{source.title}</i>. {edition} {source.publisher_name}, {format(new Date(parseISO(source.publication_date)), 'y')}.
          </small>
        :
        source.source_type === "journal" ?
          <small>
            {author_list} "{source.title}." <i>{source.publisher_name}</i>, {volume} {issue} {format(new Date(parseISO(source.publication_date)), 'LLL y')}, {pages} <i>{database_name}</i> <FindLinks key={key} text={url} component={"source"} />
          </small>
        :
        source.source_type === "magazine" ?
          <small>
            {author_list} "{source.title}." <i>{source.publisher_name}</i>, {issue} {format(new Date(parseISO(source.publication_date)), 'd LLL y')}, {pages} <i>{database_name}</i> <FindLinks key={key} text={url} component={"source"} />
          </small>
        :
        source.source_type === "newspaper" ?
          <small>
            {author_list} "{source.title}." <i>{source.publisher_name}</i>, {edition} {format(new Date(parseISO(source.publication_date)), 'd LLL y')}, {pages} <i>{database_name}</i> <FindLinks key={key} text={url} component={"source"} />
          </small>
        :
        source.source_type === "video" ?
          <small>
            {author_list} "{source.title}." <i>{source.publisher_name}</i>, {uploader_name} {format(new Date(parseISO(source.publication_date)), 'd LLL y')}, <FindLinks key={key} text={url} component={"source"} />
          </small>
        :
        source.source_type === "webpage" ?
          <small>
            {author_list} "{source.title}." <i>{source.publisher_name}</i>, {format(new Date(parseISO(source.publication_date)), 'd LLL y')}, <FindLinks key={key} text={url} component={"source"} /> Accessed {format(new Date(parseISO(source.accessed_date)), 'd LLL y')}.
          </small>
        :
          <small></small>
      }
    </p>
  )
}

export default Sources