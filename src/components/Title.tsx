import { defineComponent } from 'vue'
import './title.less'

export const Title = defineComponent({
  props: {
    testurl: {
      type: String,
    }
  },
  setup(props) {
    return () => (
      <h1 class='title'>{props.testurl}</h1>
    )
  },
})