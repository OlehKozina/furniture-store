const cardQuery = `{
    _key,
    name,
    "image": image.asset->url,
    content,
    price,
    oldPrice,
    rating
  }
`;

const cardsQuery = `
    _type == "cards" => {
      id,
      heading,
      "categories":*[_type == "categories"]{name, _id, "image":image.asset->url},
      "cards":*[_type == "products"]${cardQuery},
    }
`;
const mediaWithTextQuery = `
    _type == "mediaWithText" =>{
      id,
      heading, 
      content,
      "image": image.asset->url,
      "horizontalImage": image.asset->url,
    }
`;
const galleryQuery = `
  _type == "gallery" =>{
    heading,
    id,
    images[]{
      _key,
      "url": asset->url
    }
  }
`;
const sliderQuery = `
    _type == "slider" =>{
      id,
      heading,
      slides[]${cardQuery}
    }
`;
const sliderVerticalQuery = `
    _type == "sliderVertical" =>{
      id,
      heading,
      slides[]${cardQuery}
    }
`;

const benefitsQuery = `
    _type == "benefits" =>{
    heading,
    id,
    benefits[]{
    name, 
    "image": image.asset->url,
    content
    }
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
      id,
      heading,
      "videoTop": videoTop.asset->url,
      "videoBottom": videoBottom.asset->url,
      "image": image.asset->url,
      text
    }
`;
const contactQuery = `
    _type == "contact" =>{
      id,
      heading,
      content,
      addresses
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
  benefitsQuery,
].join(",");

export const componentsQuery = `
  components[] {
    ...,
    ${queries}
  }
`;
