function init(){
    const slides = document.querySelectorAll(".slide");   //slides are three dots
    const pages = document.querySelectorAll(".page");     //all of our pages 
    const backgrounds = [`radial-gradient(#2B3760, #0B1023)`,`radial-gradient(#4E3022, #161616)`,`radial-gradient(#4E4342,#161616)`];   //just for bg colors
    
    //Tracker
    let current = 0;
    let scrollSlide = 0;

    slides.forEach((slide,index) => {    //to manage dots
        slide.addEventListener('click',function(){
            changeDots(this);
            nextSlide(index);   //represents the no. we are clicking on
            scrollSlide = index;
        });
    });

    function changeDots(dot){
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        dot.classList.add('active')   //when we click on dots we add a class of active on dots
    }

    function nextSlide(pageNumber){
        const nextPage = pages[pageNumber];   //we get the next page we are click on
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector(".hero .model-left");
        const nextRight = nextPage.querySelector(".hero .model-right");
        const currentLeft = currentPage.querySelector(".hero .model-left");
        const currentRight = currentPage.querySelector(".hero .model-right");
        const nextText = nextPage.querySelector(".details");      //text that are coming
        const portfolio = document.querySelector(".portfolio");   //whole page

        const tl = new TimelineMax({
            onStart: function(){
                slides.forEach(slide =>{
                    slide.style.pointerEvents = 'none';
                })
            },
            onComplete: function(){
                slides.forEach(slide =>{
                    slide.style.pointerEvents = 'all';
                })
            }
        });

        tl.fromTo(currentLeft, 0.3, {y:"-10%"},{y:"-100%"})
        .fromTo(currentRight, 0.3, {y:'10%'},{y:'-100%'}, '-=0.2')    //with -0.2 it will start faster i.e. after 0.1 ms from currentLeft
        .to(portfolio, 0.3, {backgroundImage:backgrounds[pageNumber]})    //to change bg color
        .fromTo(currentPage,0.3,{opacity:1,pointerEvents:'all'},{opacity:0,pointerEvents:'none'})   //current page we are on and fade it out
        .fromTo(nextPage,0.3,{opacity:0,pointerEvents:'none'},{opacity:1,pointerEvents:'all'},"-=0.6")     //next page back
        
        .fromTo(nextLeft,0.3,{y:'-100%'}, {y:'-10%'},'-=0.6')         // images that are coming in
        .fromTo(nextRight,0.3,{y:'-100%'}, {y:'10%'},'-=0.8')         // images that are coming in
        .fromTo(nextText,0.3,{opacity:0,y:0},{opacity:1,y:0})
        .set(nextLeft, {clearProps:"all"})
        .set(nextRight, {clearProps:"all"});

        current = pageNumber;
    }

    document.addEventListener('wheel',throttle(scrollChange,1500));
    document.addEventListener('touchmove',throttle(scrollChange,1500));

    function switchDots(dotNumber){
        const activeDot = document.querySelectorAll(".slide")[dotNumber];     //to change slides with dots
        slides.forEach(slide=>{
            slide.classList.remove("active");
        });
        activeDot.classList.add("active");
    }

    function scrollChange(e) {
        if(e.deltaY > 0){
            scrollSlide += 1;
        }
        else{
            scrollSlide -= 1;
        }
        
        if(scrollSlide > 2){    //if slides more then 2 times then back to 0
            scrollSlide = 0;
        }
        if(scrollSlide <0){    //if slides less then 0 then go to 2
            scrollSlide = 2;
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
        console.log(scrollSlide);
    }
  
    const hamburger = document.querySelector('.menu');
    const hamburgerLines = document.querySelectorAll('.menu line');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const tl = new TimelineMax({paused:true, reversed:true});

    tl.to(navOpen,0.5,{y:0})
    .fromTo(contact,0.5,{opacity:0,y:10},{opacity:1,y:0}, '-=0.1')
    .fromTo(social,0.5,{opacity:0,y:10},{opacity:1,y:0}, '-=0.5')
    .fromTo(logo,0.2,{color:'white'},{color:'black'}, '-=1')
    .fromTo(hamburgerLines,0.2,{stroke:'white'},{stroke:'black'},'-=1');

    hamburger.addEventListener('click',()=>{           // this is for three lines 
        tl.reversed() ? tl.play() : tl.reverse();     // it checks the reverse the play the animation and reverse when we click
    });
 }


 function throttle(func,limit){
    let inThrottle;
    return function(){
        const args = arguments;
        const context = this;
        if(!inThrottle){
            func.apply(context,args);
            inThrottle = true;
            setTimeout(()=>(inThrottle = false),limit);
        }
    };
 }

init();