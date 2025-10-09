export const getCoordinates = async (address: string) => {
    const apiKey = 'AIzaSyDa-bdUYrEY94QiQ8RVqLlcHK7HNRhSSz0';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    // console.log(url)
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
    } else {
        console.error('Erro no geocoding:', data.status);
        return null;
    }
};