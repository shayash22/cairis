#  Licensed to the Apache Software Foundation (ASF) under one
#  or more contributor license agreements.  See the NOTICE file
#  distributed with this work for additional information
#  regarding copyright ownership.  The ASF licenses this file
#  to you under the Apache License, Version 2.0 (the
#  "License"); you may not use this file except in compliance
#  with the License.  You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing,
#  software distributed under the License is distributed on an
#  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
#  specific language governing permissions and limitations
#  under the License.

import sys
if (sys.version_info > (3,)):
  import http.client
  from http.client import BAD_REQUEST, CONFLICT, NOT_FOUND, OK
else:
  import httplib
  from httplib import BAD_REQUEST, CONFLICT, NOT_FOUND, OK
from flask import session, request, make_response
from flask_restful import Resource
from cairis.daemon.CairisHTTPError import MalformedJSONHTTPError, ARMHTTPError, ObjectNotFoundHTTPError
from cairis.tools.JsonConverter import json_serialize
from cairis.tools.SessionValidator import get_session_id
from importlib import import_module

__author__ = 'Robin Quetin, Shamal Faily'

class ResponseByNameGenerateAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.ResponseDAO'),'ResponseDAO')

  def post(self, name):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    dao.generate_goal(name)
    dao.close()
    resp_dict = {'message': 'Goal successfully generated'}
    resp = make_response(json_serialize(resp_dict), OK)
    resp.headers['Content-type'] = 'application/json'
    return resp
