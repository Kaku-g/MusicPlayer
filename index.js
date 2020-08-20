const image = document.querySelector('img');
const title= document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer= document.getElementById('progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn= document.getElementById('prev');
const playBtn= document.getElementById('play');
const nextBtn= document.getElementById('next'); 
//for playlist 
const playlist = document.querySelector('.playlist');
let ul = document.createElement('ul');

const songs=[
    {
        name:'Bheji ki Barat',
        displayName:'Bheji ki Barat',
        artist:'Ruhan'
    
    },
    {
        name:'Nirpankhi Maya',
        displayName:'Nirpankhi Maya',
        artist:'Ruhan'
    },
    {
        name:'Pahari Mashup 1',
        displayName:'Pahari Mashup 1',
        artist:'Ruhan'
    },
    {
        name:'Pahari Mashup 2',
        displayName:'Pahari Mashup 2',
        artist:'Ruhan'
    },
    {
        name:'Ab Lagalu Mandana',
        displayName:'Ab Lagalu Mandana',
        artist:'Ruhan'
    },
    {
        name:'Bhagtu Mama',
        displayName:'Bhagtu Mama',
        artist:'Ruhan'
    },
    {
        name:'Khuti Rodige',
        displayName:'Khuti Rodige',
        artist:'Ruhan'
    },
    {
        name:'Preet Ku Rog',
        displayName:'Preet Ku Rog',
        artist:'Ruhan'
    },
    {
        name:'Tara Lagure',
        displayName:'Tara Lagure',
        artist:'Ruhan'
    },
    {
        name:'Himachali Syo Ki Dani',
        displayName:'Himachali Syo Ki Dani',
        artist:'Ruhan'
    }

    
    ];
    //Making a list to append according to array;
console.log(songs);
const listItem = songs.map(el=>{
   return el.displayName;
});
console.log(listItem);
songs.map(e=>{
    let item = document.createElement('li');
    item.append(e.displayName);
    ul.append(item);
    
    
}
);

playlist.append(ul);
//here making list ends
let index;
const indexCalculate=(name)=>{
    songs.forEach((e,i)=>{
        if(e.displayName==name){
           index=i;
           
        }
    } );
   

};






ul.addEventListener('click',(e)=>{
   
 let listItemName= e.target.textContent;
 indexCalculate(listItemName);
 console.log(index);
 
 loadSong(songs[index]);
 playSong();
});



    



//check if playing

let isPlaying=false;
let songIndex=0;

//play

const playSong = ()=>{
isPlaying=true;
playBtn.classList.replace('fa-play','fa-pause');
playBtn.setAttribute('title','Pause');
    music.play();
};


//pause

const pauseSong = ()=>{
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
};
//play or pause event listener

playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));






const prevSong = () =>{
    songIndex--;
    if(songIndex<0){
         songIndex=songs.length -1;

    
    }
    loadSong(songs[songIndex]);
    playSong();

};
const nextSong = () =>{
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    
    }
    loadSong(songs[songIndex]);
    playSong();

};
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

//all songs list





//update DOM Songs
const loadSong=(song)=>{
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src= `images/${song.name}.jpg`;

};

//default music
const updateProgressBar = (e)=>{
    if(isPlaying){
       // console.log(e);
       const{ duration,currentTime} = e.srcElement;
       //console.log(duration,currentTime); 
       const progressPercent = (currentTime/duration)*100;
       //console.log(progressPercent);
       progress.style.width=`${progressPercent}%`;
       //calculate display for duration
       const durationMinutes = Math.floor(duration/60);
      // console.log(durationMinutes);
       let durationSeconds= Math.floor(duration%60);
       if(durationSeconds<10){
           durationSeconds=`0${durationSeconds}`;
          
       };
       //to delay updating time in DOM TO PREVENT NAN
       if(durationSeconds){
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;

       }
       //calculate display for current 
       const currentMinutes = Math.floor(currentTime/60);
       //console.log(durationMinutes);
       let currentSeconds= Math.floor(currentTime%60);
       if(currentSeconds<10){
        currentSeconds=`0${currentSeconds}`;
          
       };
       if(currentSeconds){
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;

       }

    }

}


const setProgressBar=(e)=>{
    //console.log(e);
    //console.log('clicked');
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    //console.log(width,clickX);
    const { duration } = music;
    //console.log(music.currentTime);
    music.currentTime=(clickX/width)*duration;
};


music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);
