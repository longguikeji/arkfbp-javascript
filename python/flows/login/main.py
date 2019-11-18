from ark import (
    Flow,
    Graph,
    StartNode,
    StopNode,
    FunctionNode,
    IFNode,
    APINode,
)


class GetFormDataNode(FunctionNode):
    '''
    将请求中的POST Body体转换成JSON数据
    '''

    def run(self, *args, **kwargs):
        '''
        客户端通过POST BODY体发送
        '''

        # json_body_data = self.state.request.json_body

        # return {
        #     'username': json_body_data['username'],
        #     'password': json_body_data['password'],
        # }

        return {
            'username': 'rock',
            'password': '123456',
        }


# class GetUserNode(FunctionNode):
class CallGithubAPINode(APINode):


    url = 'https://api.github.com/orgs/longguikeji/repos'


    # def run(self, *args, **kwargs):
    #     # Todo: connect the database

    #     # SQL = 'SELECT * FROM user WHERE username=%s AND password=%s'

    #     return {
    #         'user': {
    #             'id': 1,
    #             'name': 'Rock',
    #         }
    #     }s


# class CheckUserNode(IFNode):

#     def statement(self):
#         if self.inputs.get('user'):
#             return True

#         return False

class CheckUserNode(FunctionNode):

    def run(self):
        ret = []
        for repo in self.inputs:
            ret.append({
                'name': repo['name'],
                'description': repo['description'],
            })

        print(ret)
        return ret


class SetTokenNode(FunctionNode):

    def run(self, *args, **kwargs):
        # Generate token

        return {
            'token': 'xxxx'
        }


class SetErrorNode(FunctionNode):

    def run(self, *args, **kwargs):
        pass


class SetResponseNode(FunctionNode):

    def run(self, *args, **kwargs):
        print(self.inputs)
        return {
            'response': {
                'token': self.inputs['token'],
            }
        }


class Main(Flow):

    '''
    用户登录流程

    1. 从Request里面解析用户登录参数
    2. 根据参数查询数据库查找是否有匹配的用户
    3. 如果找到匹配的用户，则设置用户Token， 找不到设置错误信息
    4. 设置Token在Response中给用户返回
    5. 设置Response
    6. 结束
    '''

    def create_graph(self):
        g = Graph()

        g.nodes = [
            {
                'cls': StartNode,
                'id': 1,
                'next': 2,
            },
            {
                'cls': GetFormDataNode,
                'id': 2,
                'next': 3,
            },
            {
                'cls': CallGithubAPINode,
                'id': 3,
                'next': 4,
            },
            {
                'cls': CheckUserNode,
                'id': 4,
                'positive_next': 5,
                'negative_next': 6,
            },
            {
                'cls': SetTokenNode,
                'id': 5,
                'next': 7,
            },
            {
                'cls': SetErrorNode,
                'id': 6,
                'next': 7,
            },
            {
                'cls': SetResponseNode,
                'id': 7,
                'next': 8,
            },
            {
                'cls': StopNode,
                'id': 8,
            },
        ]

        return g
