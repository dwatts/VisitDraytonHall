  //Small Labels

        var labelVerticalOffsetS = {
            screenLength: 5,
            maxWorldLength: 25,
            minWorldLength: 6
        };

        var labelRendererSmall = {
            type: "simple",
            symbol: {
              type: "point-3d", 
                symbolLayers: [
                  {
                    type: "icon",
                    material: {
                      color: [99, 99, 99]
                    },
                    size: 0,
                    outline: {
                      color: "#404040",
                      size: 1
                    }
                  }
                ],

                verticalOffset: labelVerticalOffsetS,

                callout: {
                  type: "line",
                  color: [0,0,0],
                  size: .5,
                  border: {
                    color: [255,255,255,0]
                  }
                }
              }
          };

  //Medium Labels

        var labelVerticalOffsetM = {
            screenLength: 10,
            maxWorldLength: 50,
            minWorldLength: 12
        };

        var labelRendererMed = {
            type: "simple",
            symbol: {
              type: "point-3d", 
                symbolLayers: [
                  {
                    type: "icon",
                    material: {
                      color: [99, 99, 99]
                    },
                    size: 0,
                    outline: {
                      color: "#404040",
                      size: 1
                    }
                  }
                ],

                verticalOffset: labelVerticalOffsetM,

                callout: {
                  type: "line",
                  color: [0,0,0],
                  size: .5,
                  border: {
                    color: [255,255,255,0]
                  }
                }
              }
          };

  //Large Labels

        var labelVerticalOffsetL = {
            screenLength: 30,
            maxWorldLength: 65,
            minWorldLength: 20
        };

        var labelRendererLarge = {
            type: "simple",
            symbol: {
              type: "point-3d", 
                symbolLayers: [
                  {
                    type: "icon",
                    material: {
                      color: [99, 99, 99]
                    },
                    size: 0,
                    outline: {
                      color: "#404040",
                      size: 1
                    }
                  }
                ],

                verticalOffset: labelVerticalOffsetL,

                callout: {
                  type: "line",
                  color: [0,0,0],
                  size: .5,
                  border: {
                    color: [255,255,255,0]
                  }
                }
              }
          };

 