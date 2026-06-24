import { getWorks } from "./api.js";
import { generateGallery } from "./dom.js";




const works = await getWorks();
console.log(works);

generateGallery(works);