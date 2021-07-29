


L.Control.MousePosition = L.Control.extend({
  options: {
    position: 'bottomleft',
    separator: '    ',
    emptyString: 'Unavailable',
    lngFirst: false,
    numDigits: 5,
    lngFormatter: undefined,
    latFormatter: undefined,
    prefix: ""
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
    L.DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove)
  },

  _onMouseMove: function (e) {
    var lng = "Lon: " + ConvertCoords(e.latlng.lng)//this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.);
    var lat = "Lat: " + ConvertCoords(e.latlng.lat)//this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  }

});

function ConvertCoords(DD){
  // converts DD from decimal degrees to DMS

  //check if DD < 0
  if (DD < 0){
    absDD = -DD
  } else {
    absDD = DD
  }
  
  degrees = parseInt(absDD)
  //calc minutes and seconds
  minutes = parseInt((absDD - degrees)*60)
  seconds = (absDD - degrees - minutes/60)*3600
  seconds = parseInt(seconds)

  //construct string
  sepD = "o"
  if (DD < 0) {
    DMS = -degrees.toString() + sepD.sup() + " " + minutes +"' " + seconds + "\""
  } else {
    DMS = degrees.toString() + sepD.sup() + " " + minutes +"' " + seconds + "\""
  }
  return DMS
}

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.mousePosition = function (options) {
    return new L.Control.MousePosition(options);
};
