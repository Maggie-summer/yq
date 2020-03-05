import {
    BASEURL
} from '@/config/index.js'

let instance = axios.create({
    baseURL: BASEURL
})

import axios from 'axios'

export let $get = function(url, params) {
    return instance.get(url, {
        params
    })
}
export let $post = function(url, params) {
    return instance.post(url,
        params
    )
}