/*global variables */

/*var items=[
    {//first item
        code: '1tvs',
        title: 'TV Samsung',
        price: 1000,
        description: 'This is the long descrption of the item',
        category: 'Electronics',
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ1QCp59uHlJ3C3MKIatXeL-0Qpy37xTxlcl8XlwDjSrFBaTRMRtLGxt07PojuUvrbdvAypTifNEVz32V4-xFmIX7mRCiHg6aNW4Vkrag&usqp=CAc'
    },

    {//second item
        code: '1ph10',
        title: 'iPhone',
        price: 1000,
        description: 'This is the long description of the item',
        category: 'Mobile device',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuehR_Hv46-s8ua14yy13q0jcle_nzVKHeMqDMbnfd_0noRgfr3gWRFnf3qF86Da_5IUPv&usqp=CAc'
    },

    {//third item
        code: '2spk',
        title: 'Speaker',
        price: 175,
        description: 'This is the long description of the item',
        category: 'Sound',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjCSqtUdI5D8VtCkA4GXhdWRmt6wZWfgcKvAVy0QbWEE-2PF7i55fXZLmOTymAm9eifS_IGgTz&usqp=CAc'
    }

];*/

var items=[];
var serverURL="http://localhost:8080/API/";

function fetchCatalog(){
    //get the items from the Server
    $.ajax({
        url:serverURL+"items",
        type:"GET",
        success:function(res){
            console.log("It works",res);
            for(var i=0;i<res.length;i++){
                if(res[i].user=="Gerry"){
                items.push(res[i]);
                }
            }
            displayCatalog();
        },

        error:function(details){
            console.log("Error",details);
        }
    });



}

function displayCatalog(){
    //travel the array
    for(var i=0;i<items.length;i++){
    //get the element
        var product= items[i];
    //create the string
        drawItem(product);
    }
}

function drawItem(product){
    
    var layout= `
    <div class="item" id= "${product.code}">
        <img src= "${product.image}">
        <h4>${product.title}</h4>
        <h6 class="itemPrice">$ ${product.price}</h6>
        <p> ${product.description}</p>
        <button class= "btn btn-primary"> Add to Cart </button>
        </div>
    `;

    //dispaly the element in the DOM (HTML)
        $('#catalog').append(layout);
}

function search(){
    
    var searchText=$("#txt-search").val();
    $('#catalog').html("");
    for(var i=0;i<items.length;i++){
        var item=items[i];
        if(item.title.toLowerCase().includes(searchText.toLowerCase())){
            drawItem(item);
        }
    }
}

/*initialization*/
function init(){
    console.log('catalog page');
    fetchCatalog();
    $("#btn-search").click(search);

}

window.onload=init;




//images
//https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MRWM2_AV1_GOLD_GEO_MX?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1536254549811

//https://images.samsung.com/is/image/samsung/pe-fhdtv-j5290-un49j5290agxpe-frontblack-113108078?$PD_GALLERY_L_JPG$

//https://cdn.audioaffair.co.uk/media/catalog/product/cache/1/image/1000x1000/602f0fa2c1f0d1ba5e241f914e856ff9/1/0/100_-_black.jpg

