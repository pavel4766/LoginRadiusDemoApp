// let LRObject = ()=> {
//     if (typeof LoginRadiusV2 === 'undefined') {
//         let e = document.createElement('script');
//         e.src = 'https://auth.lrcontent2.com/v2/js/LoginRadiusV2.js';
//         e.type = 'text/javascript';
//         document.getElementsByTagName("head")[0].appendChild(e);
//     }
//
//     let lrloadInterval = setInterval(function () {
//         if (typeof LoginRadiusV2 != 'undefined') {
//             clearInterval(lrloadInterval);
//             LoginRadiusV2JsLoaded();
//         }
//     }, 100);
//
//     function LoginRadiusV2JsLoaded() {
//         let commonOptions = {};
//         commonOptions.apiKey = "<your loginradius api key>";
//         commonOptions.appName = 'lr-candidate4';
//         commonOptions.hashTemplate = true;
//         commonOptions.sott = "VykkAxehCS6ek2bfspRt%2bcDj6mDYBFilFiab0119XjGIrj6nYhTC4zHGbZ8gwjkvcULqV02T%2bkDXR%2fd%2btyiOXsRA2SufjlF%2bQiyV63h6OVs%3d*e0f7507670af7d03567713fa8bffb65b";
//         commonOptions.verificationUrl = 'localhost:8080';
//         return LRObject = new LoginRadiusV2(commonOptions);
//     }
// }




let commonOptions = {
    apiKey : "8cab427d-57b7-4b6a-b0da-95f6d3e19f4a",
    appName : 'lr-candidate4',
    hashTemplate : true,
    sott : "VykkAxehCS6ek2bfspRt%2bcDj6mDYBFilFiab0119XjGIrj6nYhTC4zHGbZ8gwjkvcULqV02T%2bkDXR%2fd%2btyiOXsRA2SufjlF%2bQiyV63h6OVs%3d*e0f7507670af7d03567713fa8bffb65b",
    verificationUrl : 'localhost:8080',
    resetPasswordUrl: "http://localhost:8080",
    deleteUrl: "http://localhost:8080"
};

let LRObject = new LoginRadiusV2(commonOptions);


