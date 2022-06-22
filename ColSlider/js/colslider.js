let margin = 0

class ColSlider {
    constructor(options){
        this.sliderName = options.sliderName;
        this.dots = options.dots || false;
        this.arrow = options.arrow || false;
        this.orientation = options.orientation || "horizontal";
        this.slidesAreVisible = options.slidesAreVisible || 3;
        this.slideScrolling = options.slideScrolling || 1;
        this.slip = options.slip || false;
        this.infinity = options.infinity || false;
        this.scrollingSpeed = options.scrollingSpeed || 200;
        this.indent = options.indent || 0;
        this.colSliderInit();
    }  
    colSliderInit() {
        let sliderVisibleWidth = document.querySelector("." + this.sliderName).offsetWidth;
        let sliderVisibleHeight = document.querySelector("." + this.sliderName).offsetHeight;
    
        let NameSlider = document.querySelector("." + this.sliderName)
        NameSlider.style.overflow = "hidden"


        let sliderInit = this

        colTrackInit(sliderInit);
        addItemClasses(sliderInit);
        orientationSlider(sliderInit, sliderVisibleWidth, sliderVisibleHeight);
        dots(sliderInit);
        arrow(sliderInit);
    }  
}

function colTrackInit(sliderInit){
    const sourceElement = document.querySelector("." + sliderInit.sliderName);
    const wrapper = document.createElement('div');
    wrapper.classList.add('col-track');

    Array.from(sourceElement.children)
      .forEach(el => wrapper.appendChild(el));
    sourceElement.appendChild(wrapper);

    let colTrack = document.querySelector("." +sliderInit.sliderName + " >.col-track")

    colTrack.style.display = "flex"
    colTrack.style.flex = "none"
}
function addItemClasses(sliderInit){
    const slides = [...document.querySelectorAll("." +sliderInit.sliderName + " > .col-track > div")]

    slides.forEach((item) => {
        item.classList.add(sliderInit.sliderName + "-col-item")
    })
}
function orientationSlider(sliderInit, sliderVisibleWidth, sliderVisibleHeight){
    let itemSize;

    if (sliderInit.orientation === "horizontal"){
        document.querySelector("." + sliderInit.sliderName + "> .col-track").style.flexDirection = "row";
        let itemWidth = ("calc(" + sliderVisibleWidth / sliderInit.slidesAreVisible + "px - " + (sliderInit.indent * 2) + "px)");
        itemSize = itemWidth;
    }
    else if (sliderInit.orientation === "vertical"){
        document.querySelector("." + sliderInit.sliderName + "> .col-track").style.flexDirection = "column";
        let itemHeight = ("calc(" + sliderVisibleHeight / sliderInit.slidesAreVisible + "px - " + (sliderInit.indent * 2) + "px)");
        itemSize = itemHeight;
    }
    itemSizeInit(sliderInit, itemSize);
}
function itemSizeInit(sliderInit, itemSize) {
    let colItemParams;
    
    if (sliderInit.orientation === "horizontal"){
        colItemParams = [...document.querySelectorAll("." + sliderInit.sliderName + "-col-item")];
        colItemParams.forEach((item) => {
            item.style.width = itemSize;
            item.style.margin = "0 " + sliderInit.indent + "px";
        })
    }
    else if (sliderInit.orientation === "vertical"){
        colItemParams = [...document.querySelectorAll("." + sliderInit.sliderName + "-col-item")];
        colItemParams.forEach((item) => {
            item.style.height = itemSize;
            item.style.margin = sliderInit.indent + "px 0";
        })
    }
}
function dots(sliderInit){
    if (sliderInit.dots === true){
        let colDots = document.createElement('div');
        let colDot;
        colDots.className = sliderInit.sliderName + "-dots";

        document.querySelector("." + sliderInit.sliderName).after(colDots);
        
        let dotAmount = ([...document.querySelectorAll("." + sliderInit.sliderName + "-col-item")].length / sliderInit.slideScrolling)

        for(i = 0; i < dotAmount; i++){
            colDot = document.createElement('div');
            colDot.className = sliderInit.sliderName + "-dots-dot";
            colDots.append(colDot)
        }

        let colDotAll = [...document.querySelectorAll("." + sliderInit.sliderName + "-dots-dot")];
        let track = document.querySelector("." + sliderInit.sliderName + "> .col-track");
        let trackItem = document.querySelector("." + sliderInit.sliderName + "-col-item").offsetWidth + (sliderInit.indent * 2)
        track.style.transition = sliderInit.scrollingSpeed + "ms"

        colDotAll.forEach(function(item, index) { 
            item.addEventListener('click', ()=>{
                margin = 0;
                track.style.marginLeft = margin - trackItem * index * sliderInit.slideScrolling + "px"

            });
        });
    }
}
function arrow(sliderInit){
    if (sliderInit.arrow === true){
        let colPredArrow = document.createElement('div');
        let colNextArrow = document.createElement('div');

        colPredArrow.innerHTML = "◀"
        colNextArrow.innerHTML = "▶"
        colPredArrow.className = sliderInit.sliderName + "-pred-arrow";
        colNextArrow.className = sliderInit.sliderName + "-next-arrow";

        if(sliderInit.orientation === "vertical"){
            colPredArrow.style.transform = "rotate(90deg)";
            colNextArrow.style.transform = "rotate(90deg)";
        }

        let track = document.querySelector("." + sliderInit.sliderName + "> .col-track");
        let trackItem = document.querySelector("." + sliderInit.sliderName + "-col-item").offsetWidth + sliderInit.indent * 2;
        margin = track.style.marginLeft;
        colPredArrow.addEventListener("click", () => {
            margin =  Number(Array.from(track.style.marginLeft).slice(0, - 2).join(''));
            if (sliderInit.infinity === true){
                let clonedNode = document.querySelectorAll("." + sliderInit.sliderName + "-col-item");
                const reversed = Array.from(clonedNode).reverse();
                if (margin === 0){
                    track.style.transition = "0s"
                    margin = -(margin + track.offsetWidth) + "px"
            
                    track.style.marginLeft = margin

                    margin =  Number(Array.from(track.style.marginLeft).slice(0, - 2).join(''));

                    reversed.forEach((item) => {
                        let clone = item.cloneNode(true);
                        document.querySelector("." + sliderInit.sliderName + " > .col-track").prepend(clone);
                    })
                    //margin = margin + trackItem * sliderInit.slideScrolling + "px"
                    // track.style.transition = sliderInit.scrollingSpeed + "ms"
                    //track.style.marginLeft = margin
                }
                else{
                    track.style.transition = sliderInit.scrollingSpeed + "ms"
                    margin = margin + trackItem * sliderInit.slideScrolling + "px"
                }
                track.style.marginLeft = margin
            }
           else if (sliderInit.infinity === false){
                if (margin >= 0){
                    margin = 0 + "px"
                }
                else if ( track.offsetWidth >= margin ){
                    margin = margin + trackItem * sliderInit.slideScrolling + "px"
                }
            }
            track.style.marginLeft = margin
        })
        colNextArrow.addEventListener("click", () => {
            margin =  Number(Array.from(track.style.marginLeft).slice(0, - 2).join(''))
            if (sliderInit.infinity === true){
                margin = margin - trackItem * sliderInit.slideScrolling + "px"

                if (Number(Array.from(track.style.marginLeft).slice(0, - 2).join('')) <= -(track.offsetWidth - trackItem * (sliderInit.slideScrolling + 2))){
                    let clonedNode = document.querySelectorAll("." + sliderInit.sliderName + "-col-item")
                    clonedNode.forEach((item) => {
                        let clone = item.cloneNode(true);
                        document.querySelector("." + sliderInit.sliderName + " > .col-track").appendChild(clone)
                    })
                }
                
            }
            
           else if (sliderInit.infinity === false){
                if (track.offsetWidth - (trackItem * sliderInit.slideScrolling)  <= (-margin)){
                    margin = margin + "px"
                }
                else if ( track.offsetWidth >= margin ){
                    margin = margin - trackItem * sliderInit.slideScrolling + "px"
                    track.style.marginLeft = margin
                }
            }
            track.style.marginLeft = margin
        })
    
        document.querySelector("." + sliderInit.sliderName).before(colPredArrow);
        document.querySelector("." + sliderInit.sliderName).after(colNextArrow);
    }
}
