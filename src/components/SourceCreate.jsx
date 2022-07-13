import React, { useContext, useState } from 'react'
import { FiMinusSquare } from 'react-icons/fi';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

const SourceCreate = ({ reason, showAddSource, setShowAddSource, newSource, setNewSource }) => {
  const { sources, setSources } = useContext(PredictionContext);

  const [sourceType, setSourceType] = useState("")
  const [author1Last, setAuthor1Last] = useState("");
  const [author1Initial, setAuthor1Initial] = useState("");
  const [author1First, setAuthor1First] = useState("");
  const [author2Last, setAuthor2Last] = useState("");
  const [author2Initial, setAuthor2Initial] = useState("");
  const [author2First, setAuthor2First] = useState("");
  const [addAuthor, setAddAuthor] = useState(false);
  const [etAl, setEtAl] = useState(false);
  const [publicationDate, setPublicationDate] = useState(null);
  const [publisherName, setPublisherName] = useState("");
  const [title, setTitle] = useState("");
  const [edition, setEdition] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [pages, setPages] = useState("");
  const [url, setUrl] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [accessedDate, setAccessedDate] = useState(null);

  // error handling related
  const [missingAuthor1LastError, setMissingAuthor1LastError] = useState("")
  const [missingAuthor1FirstError, setMissingAuthor1FirstError] = useState("")
  const [missingAuthor2LastError, setMissingAuthor2LastError] = useState("")
  const [missingAuthor2FirstError, setMissingAuthor2FirstError] = useState("")
  const [missingPubDateError, setMissingPubDateError] = useState("")
  const [missingPubNameError, setMissingPubNameError] = useState("")
  const [missingTitleError, setMissingTitleError] = useState("")
  // const [missingPagesError, setMissingPagesError] = useState("")
  const [missingUrlError, setMissingUrlError] = useState("")
  // const [missingUploaderNameError, setMissingUploaderNameError] = useState("")
  const [missingAccessedDateError, setMissingAccessedDateError] = useState("")

  const handleSourceTypeDropdown = (sourceName) => {
    setSourceType(sourceName);

    // state variables
    setAuthor1Last("");
    setAuthor1Initial("");
    setAuthor1First("");
    setAuthor2Last("");
    setAuthor2Initial("");
    setAuthor2First("");
    setAddAuthor(false);
    setEtAl(false);
    setPublicationDate(null);
    setPublisherName("");
    setTitle("");
    setEdition("");
    setVolume("");
    setIssue("");
    setPages("");
    setUrl("");
    setDatabaseName("");
    setUploaderName("");
    setAccessedDate(null);

    // error messages
    setMissingAuthor1LastError("");
    setMissingAuthor1FirstError("");
    setMissingAuthor2LastError("");
    setMissingAuthor2FirstError("");
    setMissingPubDateError("");
    setMissingPubNameError("");
    setMissingTitleError("");
    // setMissingPagesError("");
    setMissingUrlError("");
    // setMissingUploaderNameError("");
    setMissingAccessedDateError("");
  };

  const handleCite = async () => {
    setShowAddSource(!showAddSource);
  };

  const handleSubmitSource = async () => {
    // error handling
    let noErrors = true;
    let errorKeyword = "";

    // handling all possible input for author 1
    if (sourceType !== "basic" && (sourceType !== "video" && sourceType !== "webpage")) {
      if (author1Last === "" && author1Initial === "" && author1First === "") {
        noErrors = false;
        setMissingAuthor1LastError("Please include the author's last name");
        setMissingAuthor1FirstError("");
      } else if (author1Last === "" && author1Initial !== "" && author1First === "") {
        noErrors = false;
        setMissingAuthor1LastError("Please include the author's last name")
        setMissingAuthor1FirstError("Please include the author's first name")
      } else if (author1Last === "" && author1Initial !== "" && author1First !== "") {
        noErrors = false;
        setMissingAuthor1LastError("Please include the author's last name")
        setMissingAuthor1FirstError("")
      } else if (author1Last === "" && author1Initial === "" && author1First !== "") {
        noErrors = false;
        setMissingAuthor1LastError("Please include the author's last name")
        setMissingAuthor1FirstError("")
      } else if (author1Last !== "" && author1Initial !== "" && author1First === "") {
        noErrors = false;
        setMissingAuthor1LastError("")
        setMissingAuthor1FirstError("Please include the author's first name")
      } else if (author1Last !== "" && author1Initial === "" && author1First === "") {
        noErrors = true;
        setMissingAuthor1LastError("")
        setMissingAuthor1FirstError("");
      } else if (author1Last !== "" && author1Initial === "" && author1First !== "") {
        noErrors = true;
        setMissingAuthor1LastError("");
        setMissingAuthor1FirstError("");
      } else if (author1Last !== "" && author1Initial !== "" && author1First !== "") {
        noErrors = true;
        setMissingAuthor1LastError("");
        setMissingAuthor1FirstError("");
      };
    } else {
      noErrors = true;
      setMissingAuthor1LastError("");
      setMissingAuthor1FirstError("");
    };

    // handling all possible input for author 2
    if (addAuthor) {
      if (author2Last === "" && author2Initial === "" && author2First === "") {
        noErrors = false;
        setMissingAuthor2LastError("Please include the second author's last name");
        setMissingAuthor2FirstError("");
      } else if (author2Last === "" && author2Initial !== "" && author2First === "") {
        noErrors = false;
        setMissingAuthor2LastError("Please include the second author's last name")
        setMissingAuthor2FirstError("Please include the second author's first name")
      } else if (author2Last === "" && author2Initial !== "" && author2First !== "") {
        noErrors = false;
        setMissingAuthor2LastError("Please include the second author's last name")
        setMissingAuthor2FirstError("")
      } else if (author2Last === "" && author2Initial === "" && author2First !== "") {
        noErrors = false;
        setMissingAuthor2LastError("Please include the second author's last name")
        setMissingAuthor2FirstError("")
      } else if (author2Last !== "" && author2Initial !== "" && author2First === "") {
        noErrors = false;
        setMissingAuthor2LastError("")
        setMissingAuthor2FirstError("Please include the second author's first name")
      } else if (author2Last !== "" && author2Initial === "" && author2First === "") {
        noErrors = true;
        setMissingAuthor2LastError("")
        setMissingAuthor2FirstError("");
      } else if (author2Last !== "" && author2Initial === "" && author2First !== "") {
        noErrors = true;
        setMissingAuthor2LastError("");
        setMissingAuthor2FirstError("");
      } else if (author2Last !== "" && author2Initial !== "" && author2First !== "") {
        noErrors = true;
        setMissingAuthor2LastError("");
        setMissingAuthor2FirstError("");
      };
    } else {
      noErrors = true;
      setMissingAuthor2LastError("");
      setMissingAuthor2FirstError("");
    };

    if (sourceType !== "basic" && publicationDate === null) {
      noErrors = false;
      setMissingPubDateError("Please include the publication date")
    } else {
      setMissingPubDateError("");
    };
    if (publisherName === "") {
      noErrors = false;
      errorKeyword = "";
      if (sourceType === "journal" || sourceType === "magazine" || sourceType === "newspaper" || sourceType === "webpage") {
        errorKeyword = sourceType;
      } else if (sourceType === "video") {
        errorKeyword = "webpage or publisher";
      } else {
        errorKeyword = "publisher";
      };
      setMissingPubNameError(`Please include the name of the ${errorKeyword}`)
    } else {
      setMissingPubNameError("");
    };
    if (sourceType !== "basic" && title === "") {
      noErrors = false;
      errorKeyword = "";
      if (sourceType === "book") {
        errorKeyword = " of the book";
      } else if (sourceType === "journal" || sourceType === "magazine" || sourceType === "newspaper" || sourceType === "webpage") {
        errorKeyword = " of the article";
      } else if (sourceType === "video") {
        errorKeyword = " of the video";
      };
      setMissingTitleError(`Please include the title ${errorKeyword}`)
    } else {
      setMissingTitleError("");
    };
    // if ((sourceType === "journal" || sourceType === "magazine" || sourceType === "newspaper") && pages === "") {
    //   noErrors = false;
    //   setMissingPagesError("Please include the page numbers")
    // };
    if ((sourceType === "basic" || sourceType === "webpage" || sourceType === "video") && url === "") {
      noErrors = false;
      errorKeyword = "";
      if (sourceType === "webpage") {
        errorKeyword = " of the webpage";
      } else if (sourceType === "video") {
        errorKeyword = " of the video";
      } else {
        errorKeyword = "";
      };
      setMissingUrlError(`Please include the url ${errorKeyword}`)
    } else {
      setMissingUrlError("");
    };
    // if (uploaderName === "") {
    //   noErrors = false;
    //   setMissingUploaderNameError("Please include the name of the uploader")
    // };
    if (sourceType === "webpage" && accessedDate === null) {
      noErrors = false;
      setMissingAccessedDateError(`Please include the date you accessed the ${sourceType}`)
    } else {
      setMissingAccessedDateError("");
    };

    if (noErrors) {
      let author1LastFormatted = "";
      let author1InitialFormatted = "";
      let author1FirstFormatted = "";
      let author2LastFormatted = "";
      let author2InitialFormatted = "";
      let author2FirstFormatted = "";
      let publisherNameFormatted = publisherName[0].toUpperCase() + publisherName.substring(1);

      // format certain input to be capitalized
      if (author1Last) {
        author1LastFormatted = author1Last[0].toUpperCase() + author1Last.substring(1);
      };
      if (author1Initial) {
        author1InitialFormatted = author1Initial[0].toUpperCase();
      };
      if (author1First) {
        author1FirstFormatted = author1First[0].toUpperCase() + author1First.substring(1);
      };
      if (author2Last) {
        author2LastFormatted = author2Last[0].toUpperCase() + author2Last.substring(1);
      };
      if (author2Initial) {
        author2InitialFormatted = author2Initial[0].toUpperCase();
      };
      if (author2First) {
        author2FirstFormatted = author2First[0].toUpperCase() + author2First.substring(1);
      };

      try {
        const response = await PredictionTrackerAPI.post("/sources/", {
          reason_id: reason.reason_id,
          source_type: sourceType,
          author1_last: author1LastFormatted, //r
          author1_initial: author1InitialFormatted,
          author1_first: author1FirstFormatted,
          author2_last: author2LastFormatted,
          author2_initial: author2InitialFormatted,
          author2_first: author2FirstFormatted,
          et_al: etAl,
          publication_date: publicationDate, //r
          publisher_name: publisherNameFormatted, //r
          title, //r
          edition,
          volume,
          issue,
          pages,
          url, //r
          database_name: databaseName,
          uploader_name: uploaderName, //r
          accessed_date: accessedDate //r
        });
        setSources([...sources, response.data.data.sources]);
      } catch (err) {
        console.log(err);
      };
      setShowAddSource(!showAddSource);
      setNewSource(!newSource);
    };
  };

  const handleAddAuthor = () => {
    setAuthor2Last("");
    setAuthor2Initial("");
    setAuthor2First("");
    setMissingAuthor2LastError("");
    setMissingAuthor2FirstError("");
    setEtAl(false);
    setAddAuthor(!addAuthor)
  };

  const handleEtAl = () => {
    setAddAuthor(false)
    setEtAl(!etAl);
  };

  return (
    <>
      {showAddSource &&
        <div className="col col-sm-10 add-source mx-auto">
          <div className="row edit-source-buttons">
            <div className="col-sm-8 col-md order-1 order-sm-0 dropdown">
              {/* <p className="explanation mt-3">Choose the Citation Template below that best fits your source. If you cannot find enough information for your source, use the Basic Citation template.</p> */}
              <button className="dropdown-toggle" type="button" id="source-type-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Citation Template
              </button>
              <ul className="source-type-dropdown-ul dropdown-menu" aria-labelledby="source-type-dropdown">
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("basic")}>Basic Citation</li>
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("book")}>Book</li>
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("journal")}>Journal</li>
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("magazine")}>Magazine</li>
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("newspaper")}>Newspaper</li>
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("video")}>Video</li>
                <li className="dropdown-item" onClick={() => handleSourceTypeDropdown("webpage")}>Webpage</li>
              </ul>
            </div>
            <span className="col-sm-1 order-0 order-sm-1"><FiMinusSquare className="minus" onClick={handleCite} /></span>
          </div>

          {sourceType !== "" &&
            <>
              <h3 className="mt-4">{sourceType && sourceType[0].toUpperCase() + sourceType.substring(1)} Citation</h3>
            </>
          }
          
          {
            sourceType === "" ?
              <></>
            :
            sourceType !== "basic" ?
              <>
                <div className="form-floating">
                  <input className="form-control" id="author1_last" type="text" value={author1Last} onChange={e => setAuthor1Last(e.target.value)} placeholder="Author's Last Name" />
                  <label htmlFor="author1_last">Author's Last Name{(sourceType !== "video" && sourceType !== "webpage") ? "*" : ""}</label>
                </div>
                {missingAuthor1LastError && <div className="alert alert-danger" role="alert">{missingAuthor1LastError}</div>}
                <div className="form-floating">
                  <input className="form-control" id="author1_initial" type="text" value={author1Initial} onChange={e => setAuthor1Initial(e.target.value)} placeholder="Author's Middle Initial" />
                  <label htmlFor="author1_initial">Author's Middle Initial</label>
                </div>
                <div className="form-floating">
                  <input className="form-control" id="author1_first" type="text" value={author1First} onChange={e => setAuthor1First(e.target.value)} placeholder="Author's First Name" />
                  <label htmlFor="author1_first">Author's First Name</label>
                </div>
                {missingAuthor1FirstError && <div className="alert alert-danger" role="alert">{missingAuthor1FirstError}</div>}

                <div>
                  <input type="checkbox" id="author2" name="add_author" value={addAuthor} onChange={() => handleAddAuthor()} checked={addAuthor} />
                  <label className="checkbox-label" htmlFor="author2">Two Authors</label>
                </div>
                <div>
                  <input type="checkbox" id="et_al" name="add_author" value={etAl} onChange={() => handleEtAl()} checked={etAl} />
                  <label className="checkbox-label" htmlFor="et_al">Three or more Authors</label>
                </div>

                {addAuthor &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="author2_last" type="text" value={author2Last} onChange={e => setAuthor2Last(e.target.value)} placeholder="Author's Last Name"/>
                      <label htmlFor="author2_last">Author's Last Name*</label>
                    </div>
                    {missingAuthor2LastError && <div className="alert alert-danger" role="alert">{missingAuthor2LastError}</div>}
                    <div className="form-floating">
                      <input className="form-control" id="author2_initial" type="text" value={author2Initial} onChange={e => setAuthor2Initial(e.target.value)} placeholder="Author's Middle Initial" />
                      <label htmlFor="author2_initial">Author's Middle Initial</label>
                    </div>
                    <div className="form-floating">
                      <input className="form-control" id="author2_first" type="text" value={author2First} onChange={e => setAuthor2First(e.target.value)} placeholder="Author's First Name" />
                      <label htmlFor="author2_first">Author's First Name</label>
                    </div>
                    {missingAuthor2FirstError && <div className="alert alert-danger" role="alert">{missingAuthor2FirstError}</div>}
                  </>
                }
                {sourceType === "book" &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Book Title" />
                      <label htmlFor="title">Book Title*</label>
                    </div>
                    {missingTitleError && <div className="alert alert-danger" role="alert">{missingTitleError}</div>}
                    <div className="form-floating">
                      <input className="form-control" id="edition" type="text" value={edition} onChange={e => setEdition(e.target.value)} placeholder="Edition No." />
                      <label htmlFor="edition">Edition No.</label>
                    </div>
                    <div className="form-floating">
                      <input className="form-control" id="publisher_name" type="text" value={publisherName} onChange={e => setPublisherName(e.target.value)} placeholder="Publisher Name" />
                      <label htmlFor="publisher_name">Publisher Name*</label>
                    </div>
                    {missingPubNameError && <div className="alert alert-danger" role="alert">{missingPubNameError}</div>}
                  </>
                }
                {(sourceType === "journal" || sourceType === "magazine" || sourceType === "newspaper" || sourceType === "webpage") &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Article Title" />
                      <label htmlFor="title">Article Title*</label>
                    </div>
                    {missingTitleError && <div className="alert alert-danger" role="alert">{missingTitleError}</div>}
                    <div className="form-floating">
                      <input className="form-control" id="publisher_name" type="text" value={publisherName} onChange={e => setPublisherName(e.target.value)} placeholder={sourceType && sourceType[0].toUpperCase() + sourceType.substring(1)} />
                      <label htmlFor="publisher_name">{sourceType && sourceType[0].toUpperCase() + sourceType.substring(1)} Name*</label>
                    </div>
                    {missingPubNameError && <div className="alert alert-danger" role="alert">{missingPubNameError}</div>}
                  </>
                }
                {sourceType === "video" &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Video Title" />
                      <label htmlFor="title">Video Title*</label>
                    </div>
                    {missingTitleError && <div className="alert alert-danger" role="alert">{missingTitleError}</div>}
                    <div className="form-floating">
                      <input className="form-control" id="publisher_name" type="text" value={publisherName} onChange={e => setPublisherName(e.target.value)} placeholder="Publisher Name" />
                      <label htmlFor="publisher_name">Webpage/Publisher Name*</label>
                    </div>
                    {missingPubNameError && <div className="alert alert-danger" role="alert">{missingPubNameError}</div>}
                  </>
                }
                {sourceType === "journal" &&
                  <div className="form-floating">
                    <input className="form-control" id="volume" type="text" value={volume} onChange={e => setVolume(e.target.value)} placeholder="Volume No." />
                    <label htmlFor="volume">Volume No.</label>
                  </div>
                }
                {(sourceType === "journal" || sourceType === "magazine") &&
                  <div className="form-floating">
                    <input className="form-control" id="issue" type="text" value={issue} onChange={e => setIssue(e.target.value)} placeholder="Issue No." />
                    <label htmlFor="issue">Issue No.</label>
                  </div>
                }
                {(sourceType === "journal" || sourceType === "book") &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="pub_month" type="month" value={publicationDate} onChange={e => setPublicationDate(e.target.value)} placeholder="Publication Date" />
                      <label htmlFor="pub_month">Publication Date*</label>
                    </div>
                    {missingPubDateError && <div className="alert alert-danger" role="alert">{missingPubDateError}</div>}
                  </>
                }
                {sourceType === "newspaper" &&
                  <div className="form-floating">
                    <input className="form-control" id="edition" type="text" value={edition} onChange={e => setEdition(e.target.value)} placeholder="Edition No." />
                    <label htmlFor="edition">Edition No.</label>
                  </div>
                }
                {sourceType === "video" &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="uploader_name" type="text" value={uploaderName} onChange={e => setUploaderName(e.target.value)} placeholder="Uploader Name" />
                      <label htmlFor="uploader_name">Uploader Name</label>
                    </div>
                    {/* {missingUploaderNameError && <div className="alert alert-danger" role="alert">{missingUploaderNameError}</div>} */}
                  </>
                }
                {(sourceType === "magazine" || sourceType === "newspaper" || sourceType === "video" || sourceType === "webpage") &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="pub_date" type="date" value={publicationDate} onChange={e => setPublicationDate(e.target.value)} placeholder="Publication Date" />
                      <label htmlFor="pub_date">Publication Date*</label>
                    </div>
                    {missingPubDateError && <div className="alert alert-danger" role="alert">{missingPubDateError}</div>}
                  </>
                }
                {(sourceType === "journal" || sourceType === "magazine" || sourceType === "newspaper") &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="page_nos" type="text" value={pages} onChange={e => setPages(e.target.value)} placeholder="Page Nos." />
                      <label htmlFor="page_nos">Page Nos.</label>
                    </div>
                    {/* {missingPagesError && <div className="alert alert-danger" role="alert">{missingPagesError}</div>} */}
                    <div className="form-floating">
                      <input className="form-control" id="database_name" type="text" value={databaseName} onChange={e => setDatabaseName(e.target.value)} placeholder="Database Name" />
                      <label htmlFor="database_name">Database Name</label>
                    </div>
                  </>
                }
                {sourceType !== "book" &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="url" type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Url" />
                      <label htmlFor="url">Url{(sourceType === "webpage" || sourceType === "video") ? "*" : ""}</label>
                    </div>
                    {missingUrlError && <div className="alert alert-danger" role="alert">{missingUrlError}</div>}
                  </>
                }
                {sourceType === "webpage" &&
                  <>
                    <div className="form-floating">
                      <input className="form-control" id="accessed_date" type="date" value={accessedDate} onChange={e => setAccessedDate(e.target.value)} placeholder="Accessed Date" />
                      <label htmlFor="accessed_date">Accessed Date*</label>
                    </div>
                    {missingAccessedDateError && <div className="alert alert-danger" role="alert">{missingAccessedDateError}</div>}
                  </>
                }

                <button onClick={handleSubmitSource}>Add Source</button>
              </>
            :
            sourceType === "basic" ?
              <>
                <div className="form-floating">
                  <input className="form-control" id="publisher_name" type="text" value={publisherName} onChange={e => setPublisherName(e.target.value)} placeholder="Publisher Name" />
                  <label htmlFor="publisher_name">Publisher Name*</label>
                </div>
                {missingPubNameError && <div className="alert alert-danger" role="alert">{missingPubNameError}</div>}
                <div className="form-floating">
                    <input className="form-control" id="url" type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Url" />
                    <label htmlFor="url">Url*</label>
                </div>
                {missingUrlError && <div className="alert alert-danger" role="alert">{missingUrlError}</div>}

                <button onClick={handleSubmitSource}>Add Source</button>
              </>
            :
              <></>
          }
        </div>
      }
    </>
  )
}

export default SourceCreate