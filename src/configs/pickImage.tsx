import * as ImagePicker from 'expo-image-picker';

export default async function pickImage(aspectN1: number = 16, aspect2:number = 9) {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [aspectN1, aspect2],
            quality: 1,
        });

        if (result.canceled || !result.assets || result.assets.length === 0) {
            return null;
        }


        return result.assets[0].uri;

    } catch (error) {
        console.log("Erro ao selecionar imagem: ", error);
        alert("Ocorreu algum erro. Tente novamente mais tarde.");
        return null;
    }
}
