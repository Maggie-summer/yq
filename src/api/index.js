import {
    $get,
    $post
} from '@/utils/index.js'
export let getShitingList = function(pageIndex, pageSize) {
    return $get('/sys/shitinglist', {
        pageIndex,
        pageSize
    })
}

export let getShitingCount = function() {
    return $get('/sys/shitingcount')
}

export let delShiting = id => {
        return $post('/sys/removest', {
            id
        })
    }
    // http://47.92.50.43:8888/sys/jslist?pageIndex=1&pageSize=10
export let getJiangshiList = function(pageIndex, pageSize) {
    return $get('/sys/jslist', {
        pageIndex,
        pageSize
    })
}
export let getJiangshiCount = function() {
    return $get('/sys/jscount')
}

export let delJiangshi = id => {
    return $post('/sys/removejs', {
        id
    })
}
export let savejiangshi = jiangshi => {
    return $post('/sys/savejs', jiangshi)
}

// 编辑
export let Ediltjsinfo = id => {
    return $get('/sys/jsinfo', {
        id
    })
}


// http://47.92.50.43:8888/art/articlelist?sectionid=0&pageIndex=1&pageSize=10
export let getArticlelist = function(pageIndex, pageSize) {
    return $get('/art/articlelist', {
        pageIndex,
        pageSize
    })
}
export let delarticle = id => {
    return $post('/art/removearticle', {
        id
    })
}
export let saveArticle = form => {
        return $post('/art/saveArticle', form)
    }
    // http://47.92.50.43:8888/sys/menu 导航菜单
export let getMenu = function() {
    return $get('/sys/menu')
}
export let savemenu = navmenu => {
    return $post('/sys/savemenu', navmenu)
}
export let delMenu = id => {
        return $post('/sys/removemenu', {
            id
        })
    }
    // 编辑
export let Ediltmenu = id => {
        return $get('/sys/detailmenu', {
            id
        })
    }
    // http://47.92.50.43:8888/sys/subjectlist
export let getSubject = function() {
    return $get('/sys/subjectlist')
}
export let delSubject = id => {
    return $post('/sys/removesubject', {
        id
    })
}
export let savesubject = lesson => {
        return $post('/sys/savesubject', lesson)
    }
    // 编辑
export let Ediltsubject = id => {
        return $get('/sys/detailsubject', {
            id
        })
    }
    // http://47.92.50.43:8888/sys/firendslink
export let getFriend = function() {
    return $get('/sys/firendslink')
}
export let delFriend = id => {
    return $post('/sys/removefl', {
        id
    })
}
export let saveFriend = friend => {
        return $post('/sys/savefl', friend)
    }
    // 编辑
export let Ediltdetailfl = id => {
    return $get('/sys/detailfl', {
        id
    })
}

// http://47.92.50.43:8888/sys/siteinfo
export let getSiteinfo = function() {
    return $get('/sys/siteinfo')
}