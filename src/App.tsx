import { defineComponent } from 'vue'
import { RouterView } from 'vue-router';
import { Title } from './components/Title';
import { Foo, Too } from '@leonwerth/vue-components'

export default defineComponent({
  setup() {
    return () => (
      <div class="container">
        <Title testurl="121312123123" />
        {/* <RouterView /> */}
        <Foo title="测试第三方组件"></Foo>
        <Too title="测试第三方组件"></Too>
      </div>
    );
  }
})