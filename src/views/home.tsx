import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { Foo } from '@leonwerth/vue-components'

export default defineComponent({
    setup() {
        const store = useStore()

        return () => (
            <>
                <h1>Home</h1>
                <Foo></Foo>
                <h1>{store.state.title}</h1>
            </>
        );
    }
});