import {
  Message
} from 'element-ui';

export default function ({
  $axios,
  redirect
}) {

  $axios.onError(error => {
    let {
      statusCode,
      message
    } = error.response.data
    if (statusCode === 400) Message.warning(message)
    if (statusCode === 403) Message.warning(message)
    if (statusCode === 401) Message.warning(message)

  })
}
