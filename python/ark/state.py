import copy


class State:

    def __init__(self, init_data=None):
        self._request = None
        self._response = None
        self._data = {}
        if init_data:
            self._data = copy.deepcopy(init_data)

    @property
    def request(self):
        return self._request

    @request.setter
    def request(self, v):
        self._request = v

    @property
    def response(self):
        return self._response

    @request.setter
    def response(self, v):
        self._response = v

    def update(self, v):
        self._data.update(v)