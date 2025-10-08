import * as ImagePicker from 'expo-image-picker';

export default async function pickImage() {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
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
