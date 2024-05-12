import axios from 'axios';

export const getPlacesData = async(bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try{
        const {
            data : {data},
        } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
                {params: {
                    bl_latitude: bl_lat ? bl_lat : '22.5591072',
                    tr_latitude: tr_lat ? tr_lat : '22.8791072',
                    bl_longitude: bl_lng ? bl_lng : '88.3226229',
                    tr_longitude: tr_lng ? tr_lng : '88.6426229',
                    restaurant_tagcategory_standalone: '10591',
                    restaurant_tagcategory: '10591',
                    subcategory: 'hotel,bb,specialty',
                    adults: '1',
                    limit: '30',
                    currency: 'USD',
                    open_now: 'false',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'X-RapidAPI-Key': '3f55205b51mshd564352285fc23cp176dd7jsn117b759be493',
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                },
                }
        )
        return data;
    }catch(error){
        return null;
    }
}