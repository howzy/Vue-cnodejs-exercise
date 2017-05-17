<template>
  <section class="reply">
    <textarea id="content" rows="8" class="text"
        :class="{'err':hasErr}"
        v-model="content" placeholder="回复支持Markdown语法,请注意标记代码"></textarea>
    <a class="button" @click="addReply">确定</a>
  </section>
</template>

<script>
  import $ from 'webpack-zepto'
  import utils from '../libs/utils'
  const markdown = require('markdown').markdown
  import { mapGetters } from 'vuex'

  export default {
    props: ['topic', 'preplyId', 'replyTo'],
    data() {
      return {
        hasErr: false,
        content: ''
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    mounted() {
      if (this.replyTo) {
        this.content = `@${this.replyTo} `;
      }
    },
    methods: {
      addReply() {
        if (!this.content) {
          this.hasErr = true;
        } else {
          let time = new Date();
          let linkUsers = utils.linkUsers(this.content);
          let htmlText = markdown.toHTML(linkUsers) + this.author_txt;
          let replyContent = $('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML;
          let postData = {
            accesstoken: this.userInfo.token,
            content: this.content + this.author_txt
          };

          if (this.replyId) {
            postData.reply_id = this.replyId;
          }
          $.ajax({
            type: 'POST',
            url: `https://cnodejs.org/api/v1/topic/${this.topicId}/replies`,
            data: postData,
            dataType: 'json',
            success: (res) => {
              if (res.success) {
                this.topic.replies.push({
                  id: res.reply_id,
                  author: {
                    loginname: this.userInfo.loginname,
                    avatar_url: this.userInfo.avatar_url
                  },
                  content: replyContent,
                  ups: [],
                  create_at: time
                });
              }
              this.content = '';
            },
            error: (res) => {
              var error = JSON.parse(res.responseText);
              this.$alert(error.error_msg);
              return false;
            }
          });
        }
      }
    }
  }

</script>

<style lang="scss">
  .reply textarea {
    display: block;
    width: 100%;
    flex: 1;
    border: 1px solid #d5dbdb;
    background-color: #fff;
    font-size: 14px;
    padding: 15px;
    color: #313131;
  }

  .reply .button {
    display: inline-block;
    width: 100%;
    height: 42px;
    margin: 15px 0;
    line-height: 42px;
    color: #fff;
    font-size: 16px;
    background-color: #4fc08d;
    border: none;
    border-bottom: 2px solid #3aa373;
    text-align: center;
    vertical-align: middle;
  }
</style>