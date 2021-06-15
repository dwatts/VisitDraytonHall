    
    require([
        "esri/WebScene",
        "esri/views/SceneView",
        "esri/layers/SceneLayer",
        "esri/layers/FeatureLayer",
        //"esri/layers/TileLayer",
        //"esri/symbols/PolygonSymbol3D",
        //"esri/symbols/ExtrudeSymbol3DLayer",
        //"esri/renderers/SimpleRenderer",
        "esri/widgets/Zoom",
        "esri/widgets/Home",
        //"esri/widgets/Popup"
        //"esri/views/MapView",
        //"esri/Graphic",
        "esri/core/watchUtils",
        //"esri/layers/VectorTileLayer",
        //"esri/Map",
          
      ], function (WebScene, SceneView, SceneLayer, FeatureLayer, /*TileLayer, PolygonSymbol3D, ExtrudeSymbol3DLayer, SimpleRenderer,*/ Zoom, Home, /*Popup, MapView, Graphic,*/ watchUtils, /*VectorTileLayer, Map*/) {
        
        var arcadeExpressions = [
            {
            name: "Picture",
            title: "Picture",
            expression: "WHEN($feature.Name == 'Collonade', '/img/popup_cabin.jpg', $feature.Name == 'Flanker Building', 'https://dheinzw.maps.arcgis.com/sharing/rest/content/items/d36710c606794450ab6460d66ad85557/data', $feature.Name == 'Office', '/img/popup_cabin.jpg', $feature.Name == 'Well', '/img/Site_Plan.jpg', '')"
            }
        ]; 
          
          
        var uniqueValueInfos = [
          {
            value: "Oak",
            symbol: {
              type: "web-style",
              name: "Quercus",
              styleName: "EsriRealisticTreesStyle"
            }
          },
          {
            value: "Magnolia",
            symbol: {
              type: "web-style",
              name: "Magnolia",
              styleName: "EsriRealisticTreesStyle"
            }
          },
          {
            value: "Red Oak",
            symbol: {
              type: "web-style", 
              name: "Quercus Rubra",
              styleName: "EsriRealisticTreesStyle"
            }
          },  
        ];

        const trees = new FeatureLayer({
          url:
            "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Trees/FeatureServer",
  
          elevationInfo: {
            mode: "on-the-ground"
          },    
          renderer: {
            type: "unique-value",
            field: "Type",
            defaultSymbol: {
              type: "web-style",
              name: "Quercus",
              styleName: "EsriRealisticTreesStyle"
            },
            uniqueValueInfos: uniqueValueInfos,
            visualVariables: [
              {
                type: "size",
                field: "height",
                axis: "height" 
              },
              {
                type: "rotation",
                valueExpression: "random() * 360" 
              },
              {
                  type: "color",
                  field: "color",
                  stops: [
                    {
                      value: 1,
                      color: "#ffffff"
                    },
                    {
                      value: 100,
                      color: "#ededed"
                    }
                  ]
              }
                
            ]
          }
        });
          
        var uniqueValueInfosTwo = [
          {
            value: 1,
            symbol: {
              type: "web-style",
              name: "Quercus",
              styleName: "EsriRealisticTreesStyle"
            }
          },
          {
            value: 2,
            symbol: {
              type: "web-style",
              name: "Magnolia",
              styleName: "EsriRealisticTreesStyle"
            }
          },
          {
            value: 3,
            symbol: {
              type: "web-style", 
              name: "Quercus Rubra",
              styleName: "EsriRealisticTreesStyle"
            }
          },  
        ];

        const otherTrees = new FeatureLayer({
          url:
            "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Random_Trees/FeatureServer/0",
          elevationInfo: {
            mode: "on-the-ground"
          },    
          renderer: {
            type: "unique-value",
            field: "Type",
            defaultSymbol: {
              type: "web-style",
              name: "Quercus",
              styleName: "EsriRealisticTreesStyle"
            },
            uniqueValueInfos: uniqueValueInfosTwo,
            visualVariables: [
              {
                type: "size",
                field: "Height",
                axis: "height" 
              },
              {
                type: "rotation",
                valueExpression: "random() * 360" 
              },
              {
                  type: "color",
                  field: "color",
                  stops: [
                    {
                      value: 1,
                      color: "#ffffff"
                    },
                    {
                      value: 100,
                      color: "#ededed"
                    }
                  ]
              }
            ]
          }
        });  
          
       const site = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Site_Bounds/FeatureServer",
            maxScale: 0,
            minScale: 0,
            opacity: 0.7,
            elevationInfo: {
              mode: "on-the-ground",    
            },
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [232, 255, 238, 0.25],
                outline: {
                  color: [0,0,0,0],
                  width: 1,
                  style: "solid"    
                }
              }
            }
        });
          
        const roads = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Roads/FeatureServer",
            maxScale: 0,
            minScale: 0,
            opacity: 0.8,
            definitionExpression: "Id <> 2",
            elevationInfo: {
              mode: "on-the-ground",    
            },
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [217, 217, 217, 0.4],
                outline: {
                  color: [0,0,0,0],
                  width: 0,
                  style: "solid"    
                }
              }
            }
        }); 
        
        const mound = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Roads/FeatureServer",
            maxScale: 0,
            minScale: 0,
            opacity: 0.8,
            definitionExpression: "Id <> 1",
            elevationInfo: {
              mode: "on-the-ground",    
            },
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [255, 255, 255, 0],
                outline: {
                  color: [0,0,0,0.1],
                  width: 1,
                  style: "solid"    
                }
              }
            }
        });
          
        const lake = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Lake/FeatureServer",
            maxScale: 0,
            minScale: 0,
            opacity: 0.8,
            //definitionExpression: "Frt_Type <> 'Fort'",
            elevationInfo: {
              mode: "on-the-ground",    
            },
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [125, 147, 153, 0.5],
                outline: {
                  color: [0,0,0,0.2],
                  width: 0,
                  style: "solid"    
                }
              }
            }
        });  
          
        const ashley = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Ashley_River_Site/FeatureServer",
          maxScale: 0,
          minScale: 0,
          opacity: 1,
          //definitionExpression: "Frt_Type <> 'Fort'",
          elevationInfo: {
            mode: "on-the-ground",    
          },
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: [125, 147, 153, 0.5],
              outline: {
                color: [0,0,0,0.2],
                width: 1,
                style: "solid"    
              }
            }
          }
        });

        const appBoundary = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/App_Boundary/FeatureServer",
          maxScale: 0,
          minScale: 0,
          opacity: 1,
          elevationInfo: {
            mode: "on-the-ground",    
          },
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: [255, 255, 255, 0],
              outline: {
                color: [0,0,0,1],
                width: 1,
                style: "solid"    
              }
            }
          }
        });

        const ashleyLabel = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Ashley_Letters/FeatureServer",
          maxScale: 0,
          minScale: 0,
          opacity: 0.8,

          elevationInfo: {
            mode: "on-the-ground",    
          },
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: [0,0,0, 0.1],
              outline: {
                color: [0,0,0,0.1],
                width: 0,
                style: "solid"    
              }
            }
          }
      });
        
      const siteLabelsHouse = new FeatureLayer ({
        url:"https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Label_Points/FeatureServer",
        renderer: labelRendererLarge,
        visible: false,
        definitionExpression: "Id = 0",
        //maxScale: 0,
        //minScale: 300,
        labelingInfo: [{

        labelExpressionInfo: {
            expression: 'DefaultValue($feature.Label_Txt, "no data")'
          },   
          labelPlacement: "above-center",    
          symbol: {
            type: "label-3d",
            symbolLayers: [{
              type: "text",
              horizontalAlignment: "right",    
              material: {
                color: [0, 0, 0]
              },
              halo: {
                color: [255, 255, 255, 0.8],
                size: 1
              },
              font: {
                weight: "normal",
                family: "Montserrat"
              },
                  
              size: 7,   
            }],
          } 
        }]
      });
        
        const siteLabelsBuildings = new FeatureLayer ({
          url:"https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Label_Points/FeatureServer",
          renderer: labelRendererMed,
          visible: false,
          definitionExpression: "Id IN (1,2,4)",
          //maxScale: 0,
          //minScale: 300,
          labelingInfo: [{

          labelExpressionInfo: {
              expression: 'DefaultValue($feature.Label_Txt, "no data")'
            },   
            labelPlacement: "above-center",    
            symbol: {
              type: "label-3d",
              symbolLayers: [{
                type: "text",
                horizontalAlignment: "right",    
                material: {
                  color: [0, 0, 0]
                },
                halo: {
                  color: [255, 255, 255, 0.8],
                  size: 1
                },
                font: {
                  weight: "normal",
                  family: "Montserrat"
                },
                    
                size: 7,   
              }],
            } 
          }]
        });
        
        const siteLabelsFeatures = new FeatureLayer ({
          url:"https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Label_Points/FeatureServer",
          renderer: labelRendererSmall,
          visible: false,
          definitionExpression: "Id IN (3, 5, 6, 7)",
          //maxScale: 0,
          //minScale: 300,
          labelingInfo: [{

          labelExpressionInfo: {
              expression: 'DefaultValue($feature.Label_Txt, "no data")'
            },   
            labelPlacement: "above-center",    
            symbol: {
              type: "label-3d",
              symbolLayers: [{
                type: "text",
                horizontalAlignment: "right",    
                material: {
                  color: [0, 0, 0]
                },
                halo: {
                  color: [255, 255, 255, 0.8],
                  size: 1
                },
                font: {
                  weight: "normal",
                  family: "Montserrat"
                },
                    
                size: 7,   
              }],
            } 
          }]
        });
        
/********Drayton Buildings**********/  
        
       var draytonTemplate = {
          outFields: ["*"],
          content: function (feature) {
            return setContentInfo(feature.graphic.attributes);
          },    
        };

          
        const draytonHouse = new SceneLayer({ url:"https://tiles.arcgis.com/tiles/uX5kr9HIx4qXytm9/arcgis/rest/services/Drayton_House/SceneServer",
          popupEnabled: true,
          popupTemplate: draytonTemplate
        });
        
        function setContentInfo(results) {
        
            var drayton = "<img class='popupImage' src='img/popup_drayton.jpg'/>";

            
            var popupElement = document.createElement("div");
        
            popupElement.innerHTML = "<table><tbody><tr><td>" + drayton + "</td></tr></tbody></table><h1>Drayton Hall</h1><table><tbody><tr><td><h2>Construction Date:</h2></td><td><h3>1738 - 1742</h3></td></tr><tr><td><h2>Building Use:</h2></td><td><h3>Main House</h3></td></tr><tr><td><h2>Style:</h2></td><td><h3> Palladian</h3></td></tr><tr><td><h2>Primary Material:</h2></td><td><h3>Brick</h3></td></tr><tr><td><h2>Notes:</h2></td><td><h3>Drayton Hall was built between 1738 and 1742 by John Drayton. It is located approximately 15 miles from Charleston, South Carolina and is considered by many to be one of the finest extant plantation houses in the country.</h3></td></tr></tbody></table>"
            
            return popupElement;
        
        };
          
        var houseEdges = {
          type: "solid",
          color: [0, 0, 0, 0.5],
          size: .5
        };  
          
        var draytonHouseSymbol = {
          type: "mesh-3d",
          symbolLayers: [
            {
              type: "fill",
              material: {
                color: [224, 224, 224]
              },
              edges: houseEdges
            }
          ]
        };

        draytonHouse.renderer = {
          type: "simple", 
          symbol: draytonHouseSymbol
        };
        
        //////////
        
        var buildingTemplate = {
          outFields: ["*"],
          content: function (feature) {
            return setContentInfoTwo(feature.graphic.attributes);
          },    
        };
        
        const draytonOther = new SceneLayer({ url:"https://tiles.arcgis.com/tiles/CmuSiXApoWtqLYty/arcgis/rest/services/Drayton_Outbuildings/SceneServer",
        popupEnabled: true,
        popupTemplate: buildingTemplate, 
        definitionExpression: "OBJECTID NOT IN (1, 2, 3, 4, 5, 6, 7)",                                     
        visible: true,
        });
        
        function setContentInfoTwo(results) {
          //var CollonadeOne = "<img class='popupImage' src='img/Portico_Detail.jpg'/>";
          //var CollonadeTwo = "<img class='popupImage' src='img/Portico_Detail.jpg'/>";            
          var FlankerOne = "<img class='popupImage' src='img/drayton_flanker_one.png'/>";
          var FlankerTwo = "<img class='popupImage' src='img/drayton_flanker_two.png'/>";            
          var Office = "<img class='popupImage' src='img/popup_cabin.jpg'/>";            
          var Well = "<img class='popupImage' src='img/well_image.jpg'/>";
          
          var image = (
              //results.OBJECTID == 3 ? CollonadeOne :
              //results.OBJECTID == 4 ? CollonadeTwo :
              results.OBJECTID == 9 ? FlankerOne :
              results.OBJECTID == 8 ? FlankerTwo :
              results.OBJECTID == 10 ? Office :
              results.OBJECTID == 11 ? Well :
              ''
          );
          
          var popupElement = document.createElement("div");
      
          popupElement.innerHTML = "<table><tbody><tr><td>" + image + "</td></tr></tbody></table><h1>" + results.Name + "</h1><table><tbody><tr><td><h2>Construction Date:</h2></td><td><h3>" + results.YrBuilt + "</h3></td></tr><tr><td><h2>Building Use:</h2></td><td><h3>"+ results.Use + "</h3></td></tr><tr><td><h2>Style:</h2></td><td><h3>" + results.Style + "</h3></td></tr><tr><td><h2>Primary Material:</h2></td><td><h3>Brick</h3></td></tr><tr><td><h2>Notes:</h2></td><td><h3>" + results.Note + "</h3></td></tr></tbody></table>";
          
          return popupElement;
        };
      
        var otherEdges = {
          type: "solid",
          color: [0, 0, 0, 0.3],
          size: .5
        }; 
          
        var draytonOtherSymbol = {
          type: "mesh-3d",
          symbolLayers: [
            {
              type: "fill",
              material: {
                color: [224, 224, 224]
              },
              edges: otherEdges
            }
          ]
        };

        draytonOther.renderer = {
          type: "simple",
          symbol: draytonOtherSymbol
        };
        
        /***Add other buildings without popups***/
          
        const draytonOtherTwo = new SceneLayer({ url:"https://tiles.arcgis.com/tiles/CmuSiXApoWtqLYty/arcgis/rest/services/Drayton_Outbuildings/SceneServer",
        popupEnabled: false,
        definitionExpression: "OBJECTID IN (1, 2, 3, 4, 5, 6, 7)",                                     
        visible: true,
        });
          
        var otherEdges = {
          type: "solid",
          color: [0, 0, 0, 0.3],
          size: .5
        }; 
          
        var draytonOtherSymbol = {
          type: "mesh-3d",
          symbolLayers: [
            {
              type: "fill",
              material: {
                color: [224, 224, 224]
              },
              edges: otherEdges
            }
          ]
        };

        draytonOther.renderer = {
          type: "simple",
          symbol: draytonOtherSymbol
        };
          
        var map = new WebScene({
          layers: [appBoundary, site, ashley, ashleyLabel, draytonHouse, draytonOther, draytonOtherTwo, roads, mound, lake, otherTrees, trees, siteLabelsHouse, siteLabelsBuildings, siteLabelsFeatures ],
          ground: "world-elevation"
        });
        
        map.ground.opacity = 0

        const view = new SceneView({
          container: "viewDiv",
          map: map,
          viewingMode: "global",
          qualityProfile: "high",
          highlightOptions: {
            color: [102, 194, 165],
            fillOpacity: 0.3
          },    
          alphaCompositingEnabled: true,
          popup: {
              collapseEnabled: false,
              dockEnabled: true,
              dockOptions: {
                  buttonEnabled: false,
                  breakpoint: false
              } 
          },
          ui: {
              components: [""]
          },    
          environment: {
            background:{
                type: "color", 
                color: [0, 0, 0, 0]
            },
          lighting: {
            directShadowsEnabled: true,
            date: new Date("Sun Mar 15 2019 19:00:00 GMT+0100 (CET)")    
          },  
            atmosphereEnabled: false,
            starsEnabled: false,
          },
          camera: {
            position: {
              latitude: 32.86931991005253,  
              longitude: -80.07792701614855,
              z: 68.08050000108778
            },
            tilt: 76.65120705767433,
            heading: 41.77908892565159
          },
          constraints: {
              altitude: {
                min: 0,
                max: 30000,
                //tilt: 150
              },
            }
        });

        view.popup.viewModel.actions = false;
          
        var zoom = new Zoom({
          view: view,
          layout: "horizontal",
          container: "zoomButtons"
        });   
      
        var homeBtn = new Home({
          view: view,
          container: "homeButton"
        });
        
        //view.ui.add(homeBtn, "manual");   
        //view.ui.add(zoom, "manual");
            
        /*view.watch('camera.tilt', function(newValue, oldValue, property, object) {
          console.log(property , newValue);
        });
          
        view.watch('camera.position', function(newValue, oldValue, property, object) {
          console.log(property , newValue);
        });
          
        view.watch('camera.heading', function(newValue, oldValue, property, object) {
          console.log(property , newValue);
        });*/

        watchUtils.whenTrueOnce(view, "updating", function(evt) {
          $("#loading").show();
        });

        watchUtils.whenFalse(view, "updating", function(evt) {
          $("#loading").hide();
        });
          
///Start Scroll Test////
          
        $(document).ready(function() {
            $('input:radio[name=control]').change(function() {
                if (this.id == 'control-1') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.8698378484793,  
                              longitude: -80.07735150716393, 
                              z: 54.7
                            },
                            tilt: 73.96921680961553,
                            heading: 40.39497407723208
                          },    
                        {
                          speedFactor: 0.4,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-2') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.870574528192186,    
                              longitude: -80.07661453511672,
                              z: 21.7
                            },
                            tilt: 76.3,
                            heading: 40.6
                          },    
                        {
                          speedFactor: 0.3,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-3') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.870449235219354,    
                              longitude: -80.0763434872864,
                              z: 30.8
                            },
                            tilt: 66.2,
                            heading: 2.3
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-4') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.87078587875417,  
                              longitude: -80.07654743589015,
                              z: 16.31394478213042
                            },
                            tilt: 67.13,
                            heading: 69.7
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-5') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.8712168157753,  
                              longitude: -80.07583073833005,
                              z: 36.6
                            },
                            tilt: 62.33,
                            heading: 223.6
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-6') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.870935656772616,   
                              longitude: -80.07600090107282, 
                              z: 16.7
                            },
                            tilt: 77.4,
                            heading: 262.19
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-7') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.870928519526316,    
                              longitude: -80.07653035300548,
                              z: 49.06
                            },
                            tilt: 36.22,
                            heading: 86.26
                          },    
                        {
                          speedFactor: 1,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-8') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.8706270973621,    
                              longitude: -80.07605745130961,
                              z: 9.51
                            },
                            tilt: 86.6,
                            heading: 324.16
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-9') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.87039659600679,  
                              longitude: -80.07623199618007,
                              z: 21.9
                            },
                            tilt: 61.9,
                            heading: 359.86
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-10') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.870635758850526,  
                              longitude: -80.07647605157942,
                              z: 33.5
                            },
                            tilt: 47.7,
                            heading: 354.9
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-11') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.8662,   
                              longitude: -80.0764, 
                              z: 478.29
                            },
                            tilt: 49.68,
                            heading: 359.79
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
                else if (this.id == 'control-12') {
                    view
                      .goTo(
                        {
                          position: {
                              latitude: 32.870277385721224,   
                              longitude: -80.0774952019164, 
                              z: 58.2
                            },
                            tilt: 69.5,
                            heading: 52.3
                          },    
                        {
                          speedFactor: 0.6,
                          easing: "out-quint"
                        }
                      )
                }
            });
        });  
         
        /***************Tour Button********************/
        
        var highlightSelect;
        
        var tourButton = document.getElementById("tour");
        
        tourButton.addEventListener("click", function() {
          if ($("ul.slides").css("display") == "none") {
              $("ul.slides").fadeToggle(1000);
              view.popup.visible = false;
              //$("input:radio[name=control][disabled=false]:first").attr('checked', true);
              $("#buttonHolder").fadeToggle(1000);
                  view
                    .goTo(
                      {
                        position: {
                            latitude: 32.8698378484793,  
                            longitude: -80.07735150716393, 
                            z: 54.7
                          },
                          tilt: 73.96921680961553,
                          heading: 40.39497407723208
                        },    
                      {
                        speedFactor: 0.4,
                        easing: "out-quint"
                      }
                    ) 
            } else {
              $("ul.slides").fadeToggle(1000);
            }
        });

        var tourButtonTwo = document.getElementById("tourTwo");
        tourButtonTwo.addEventListener("click", function() {
          if ($("ul.slides").css("display") == "none") {
            $("ul.slides").fadeToggle(1000);
            view.popup.visible = false;
            //$("input:radio[name=control][disabled=false]:first").attr('checked', true);
            $("#buttonHolder").fadeToggle(1000);
                view
                  .goTo(
                    {
                      position: {
                          latitude: 32.8698378484793,  
                          longitude: -80.07735150716393, 
                          z: 54.7
                        },
                        tilt: 73.96921680961553,
                        heading: 40.39497407723208
                      },    
                    {
                      speedFactor: 0.4,
                      easing: "out-quint"
                    }
                  ) 
          } else {
            $("ul.slides").fadeToggle(1000);
          }
        });

        $("#closeTour").click(function() {
          $("ul.slides").fadeToggle(1000);
          $("#buttonHolder").fadeToggle(1000);
          $("input[name='control']").filter("[value='1']").prop("checked",true);    
        });
        
        var labelButton = document.getElementById("labelButton");
        
        labelButton.addEventListener("click", function() {
          if (siteLabelsHouse.visible == false) {
            siteLabelsBuildings.visible = true;
            siteLabelsFeatures.visible = true;
            siteLabelsHouse.visible = true;
            $("#labelButton").html("Labels ON");
          } else {
            siteLabelsBuildings.visible = false;
            siteLabelsFeatures.visible = false;
            siteLabelsHouse.visible = false;
            $("#labelButton").html("Labels OFF");             
          }
        });
        
         $(document).ready(function(){
          $("#infoButton").click(function(){
            $("#infoDiv").fadeToggle(100);
          });
        });    

        $("#infoButton").click(function() {
          $("#infoButton").toggleClass('helpButton-clicked');   
        });       

        $("#labelButton").click(function() {
          $("#labelButton").toggleClass('labelButton-clicked');   
        }); 
        
        
        /*$('#infoButton').click(function(){
        this.checked?$('#infoDiv').fadeIn(100):$('#infoDiv').fadeOut(100); //time for show
        });*/
        
        $("#closeInfo").click(function() {
          $("#infoDiv").fadeOut(100);
          $("#infoButton").removeClass('helpButton-clicked');
          //$("#infoButton").prop("checked", false);
        })
        
    });

