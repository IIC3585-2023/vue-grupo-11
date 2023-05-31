import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavouriteStore = defineStore('favouriteItems', () => {
    const favourites = reactive([]);

    const addFavourite = (item) => {
        favourites.push(item)
        // console.log("After add:")
        // console.log(favourites)
    }

    const removeById = (id) => {
        let currentIdx = 0
        for (const item of favourites) {
            if (item.id === id) {
                break
            }
            currentIdx += 1
        }
        favourites.splice(currentIdx, 1)
        // console.log("After delete:")
        // console.log(favourites)
    }

    // const favouriteIds = computed(() => { favourites.map((item) => {
    //     return item.id
    // })})
    // const getFavouriteIds = () => {favourites.map(item => item.id)}

    return {favourites, addFavourite, removeById}
})
