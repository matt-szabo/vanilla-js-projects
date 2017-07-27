function getPhotosForSearch(searchkey) {
    var url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=be7e284c7c8bc84c932bccd6c537f5b7&text=`+ searchkey;

    return (
           fetch(url).then(function(data) {
                       return data.json();
                       }).then(function(jsonresponse){
                    var photos = jsonresponse.photos.photo;
                    var photoData = photos.map(function(fdata){

                          return{
                              title: fdata.title,
                              thumb: 'https://farm'+fdata.farm+'.staticflickr.com/'+fdata.server+'/'+fdata.id+'_'+fdata.secret+'_m.jpg',
                              large: 'https://farm'+fdata.farm+'.staticflickr.com/'+fdata.server+'/'+fdata.id+'_'+fdata.secret+'_b.jpg',
                          }
                                              })
                        return photoData;
                         })
           )
                              //  console.log(photo) //AMAZING WORKS
        }

function createFlickrThumb(photoData) {

  //var linkBox = document.createElement('p');
  var link = document.createElement('a');
  link.setAttribute('href', photoData.large);
  link.setAttribute('target', '_blank');

  var image = document.createElement('img');
  image.setAttribute('src', photoData.thumb);
  image.setAttribute('alt', photoData.title);

  link.appendChild(image);
 //linkBox.appendChild(link);

  //document.body.appendChild(link);


  return link
}






var bigphoto = {};
var app = document.querySelector('#app');
var cityForm = app.querySelector('.city-form');
var cityInput = cityForm.querySelector('.city-input');

var photopage = app.querySelector('.photopage');

var reset = app.querySelector('.clear-form');
reset.addEventListener('submit',function(){
console.log("clear me")
photopage.innerText = "";

})


cityForm.addEventListener('submit', function(event) { // this line changes
  event.preventDefault(); // prevent the form from submitting
         

         
         var photo = cityInput.value;
         bigphoto = {
          item:photo
          }
  return getPhotosForSearch(photo)
  .then(data => {
     //   console.log(data)
        data.forEach(function(b1){
            // console.log('RESULT ON LINE 60', data)
        photopage.appendChild(createFlickrThumb(b1));
        return photo;
   //  ddd.forEach(createFlickrThumb);
        });
  });

})







function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}



window.addEventListener('scroll', function(){
  amountscrolled(bigphoto.item)
 // console.log("bro you are scrolling")
});
//amountscrolled();

function amountscrolled(bbb){

  console.log("2nd search " + bbb)
    var winheight= window.innerHeight //|| (document.documentElement || document.body).clientHeight
    console.log("Winheight: "+ winheight)

    var docheight = getDocHeight();
    var scrollTop = window.pageYOffset //|| (document.documentElement || document.body.parentNode || document.body).scrollTop
    
    //console.log("scrollTop: " + scrollTop + " pageYOffset: " + pageYOffset)

    var trackLength = docheight - winheight
    var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    console.log(pctScrolled + '% scrolled')

    if (pctScrolled > 99){

      return getPhotosForSearch(bbb)
          .then(data => {

                    for (var i = 0; i<25 ; i++){

                        photopage.appendChild(createFlickrThumb(data[i]))
                      }

          });



    }
}


