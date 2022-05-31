const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
    const {  
        resolver: { 
            sourceExts, 
            assetExts 
        }  
    } = getDefaultConfig(__dirname); 

    return {
        transformer: {      
            babelTransformerPath: require.resolve("react-native-svg-transformer")    
        },    
        resolver: {
            assetExts: assetExts.filter(ext => ext !== "svg"),
            sourceExts: [...sourceExts, "svg"]    
        }};
})();