import "./externalLink.css";
const ExternalLink = (props) => {
  return (
    <>
      <a
        rel="noreferrer"
        target="_blank"
        {...props}
        href={props.href}
        className={props.className + " externalLink"}
      >
        {props.children}
      </a>
    </>
  );
};

export default ExternalLink;
