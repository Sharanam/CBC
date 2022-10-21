import Container from "../../common/lib/layout/Container";
import { Card } from "../../common/lib/styledElements/Index";
import "./style.css";

const Gallery = () => {
  return (
    <>
      <Container size="sm">
        <h1>Gallery</h1>
      </Container>
      <div className="galleryCards">
        {[1, 2, 3, 4, 5, 6].map((val, i) => {
          return (
            <Card
              key={i}
              className="galleryCard"
              style={{
                backgroundColor: "grey",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url("./(${val}).jpg")`,
              }}
            ></Card>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
