import * as ImagePicker from 'expo-image-picker';
export default async function pickImage() {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        console.log(result);
        if (!result.canceled) {
            return result.assets[0].uri
        }
        return result;
    };