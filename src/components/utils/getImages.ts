
const getImages = (r: any) => {
    try {
        let imgs:Record<string,string> = {};
        r.keys().forEach((key: string) => {
            const fileName = key.replace('./','');
            imgs[fileName] = r(key);
        });
        return imgs;
        
    } catch (error) {
        return {Error: "Error while getting images"}
    }
};

export default getImages;