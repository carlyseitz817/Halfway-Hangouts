var platform = new H.service.Platform({
    'app_id':'{qXr6JxTSNIjGC5Oz6R2u}',
    'app_code':'{dYXcTWDO6R-CHChaYaULZA}'
});

//Obtainthedefaultmaptypesfromtheplatformobject:
vardefaultLayers=platform.createDefaultLayers();

//Instantiate(anddisplay)amapobject:
var map = new H.Map(document.getElementById('mapContainer'),
defaultLayers.normal.map,{
    zoom:10,center:{lat:52.5,lng:13.4}
});