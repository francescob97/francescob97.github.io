import React, {useEffect, useState} from "react";
import "./Project.css"
import PropTypes from "prop-types";
import {Button, Carousel, OverlayTrigger, Tooltip} from "react-bootstrap";


function ProjectPage(props) {

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const module = await import(`./File/Projects/${props.projectID}/EN/data.json`);
        setJsonData(module.default);
        props.updateTitle(module.default.name);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();    
  }, [props.projectID, props.updateTitle]);  

  
  return(<div>   
    {
      jsonData ?
          <>  
            <div className="App mt-5">
              {jsonData.embedYT.length !== 0 ? <YoutubeEmbed embedId={jsonData.embedYT} /> : <></>}
              
              {jsonData.screenshots.length !== 0 ?
                  <Carousel className="mt-3" interval={3000}>
                    {jsonData.screenshots.map((screen, i) => (
                        <Carousel.Item key={i++}>
                          <img
                              className="d-block w-100"
                              src={screen}
                          />
                        </Carousel.Item>
                    ))}
                  </Carousel>  : <></>}
            </div>
            

            <div className="App mt-3 pt-4 d-flex justify-content-center">
              {jsonData.links.map((l, i) => (
                  <LinkButton key={i} platform={l.platform} link={l.link}/>                 
              ))}    
            </div>
            

            <h3 className = "mt-4"><b>{props.t("proj_intoduction")}</b></h3>
            <p>{jsonData.intro}</p>         

            <h3 className = "mt-4"><b>{props.t("proj_teaching")}</b></h3>
            <p>{jsonData.teachings}</p>
            
            
            {jsonData.attributes.length !== 0 ?
                <>
                  <h3 className = "mt-4"><b>{props.t("proj_attributions")}</b></h3>
                  <p>
                    {jsonData.attributes.map((a) => <><a href={a.link}>{a.name}</a><br/></>)}
                  </p></> : <></>}                  
          </>
          : <></>
    }
  </div>); 

}

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive" >
    <iframe         
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

function LinkButton(props) {
  
  let _color = "";
  let _icon = "";

  switch(props.platform.toLowerCase()) {
    case 'download':
      _color = "outline-warning";
      _icon = "bi bi-file-earmark-arrow-down";
      break;
    case 'github':
      _color = "outline-dark";
      _icon = "bi bi-github";
      break;
    case 'googledrive':
      _color = "outline-success";
      _icon = "bi bi-google";
      break;
    case 'dropbox':
      _color = "outline-primary";
      _icon = "bi bi-dropbox";
      break;
    case 'youtube':
      _color = "outline-danger";
      _icon = "bi bi-youtube";
      break;
    default:
      _color = "outline-secondary";
      _icon = "bi bi-link-45deg";
  }
  
  return(
      <div>
        <OverlayTrigger
            delay={{ hide: 100, show: 200 }}
            overlay={(props) => (
                <Tooltip {...props}>
                  Open into new tab
                </Tooltip>
            )}
            placement="bottom">
          <Button className="me-2" size="sm" variant={_color} onClick={() => openInNewTab(props.link)}>
            <i className={`${_icon} h1`} fill="currentColor"></i>
          </Button>
        </OverlayTrigger>
      </div>
  );
}

function openInNewTab(link) {
  window.open(link);
}



export { ProjectPage };
