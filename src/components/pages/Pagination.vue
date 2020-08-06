<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled':!paginationData.has_pre}">
                <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="$emit('pageEmit',paginationData.current_page-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li class="page-item" v-for="page in paginationData.total_pages" :key="page"
                :class="{'active':paginationData.current_page === page}">
                    <a class="page-link" href="#"
                     @click.prevent="$emit('pageEmit',page)"
                     >{{page}}</a>
                    </li>
                <li class="page-item" :class="{'disabled':!paginationData.has_next}">
                <a class="page-link" href="#" aria-label="Next"
                @click.prevent="$emit('pageEmit',paginationData.current_page+1)"
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    name:"Pagination",
    props:["paginationData"],
    data(){
        return{

        }
    },
   

}
</script>