let slideIndex: number = 1;

const SlideImages = (n: number) => {
    try {
        let i: number;
        const x = document.getElementsByClassName("slides") as HTMLCollectionOf<HTMLImageElement>;
        if (n > x.length) {slideIndex = 1}
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";  
        }
        x[slideIndex-1].style.display = "block";
        
    } catch (error) {
        return "Error while getting images"
    }
};

function PlusDivs(n: number) {
    SlideImages(slideIndex += n);
}

export {
    SlideImages,
    PlusDivs,
}