const cardQuery = `{
    _key,
    name,
    "image": image.asset->url,
    content,
  }
`;

const cardsQuery = `
    _type == "cards" => {
      "_id": navLink->_id,
      heading,
      cards[] ${cardQuery}
    }
`;
const mediaWithTextQuery = `
    _type == "mediaWithText" =>{
      "_id": navLink->_id,
      heading, 
      content,
      "image": image.asset->url,
      "horizontalImage": image.asset->url,
    }
`;
const galleryQuery = `
  _type == "gallery" =>{
    heading,
    images[]{
      _key,
      "url": asset->url
    }
  }
`;
const sliderQuery = `
    _type == "slider" =>{
      "_id": navLink->_id,
      heading,
      slides[]${cardQuery}
    }
`;
const sliderVerticalQuery = `
    _type == "sliderVertical" =>{
      "_id": navLink->_id,
      heading,
      slides[]${cardQuery}
    }
`;

const marqueeQuery = `
    _type == "marquee" =>{
      logos[]{
        "logo": asset->url,
      } 
    }
`;

const mediaGridWithTextQuery = `
    _type == "mediaGridWithText" =>{
      "_id": navLink->_id,
      heading,
      "videoTop": videoTop.asset->url,
      "videoBottom": videoBottom.asset->url,
      "image": image.asset->url,
      text
    }
`;
const contactQuery = `
    _type == "contact" =>{
      "_id": navLink->_id,
      heading,
      direction,
      form->{
        name, 
        fields,
        buttonLabel
      },
      "privacyPolicy": *[_type == "privacyPolicy"][0].content,
    }
`;

const queries = [
  cardsQuery,
  mediaWithTextQuery,
  sliderQuery,
  sliderVerticalQuery,
  mediaGridWithTextQuery,
  contactQuery,
  marqueeQuery,
  galleryQuery,
].join(",");

export const componentsQuery = `
  components[] {
    ...,
    ${queries}
  }
`;
