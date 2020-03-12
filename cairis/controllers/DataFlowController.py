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
from flask import request, session, make_response
from flask_restful import Resource
from cairis.daemon.CairisHTTPError import ARMHTTPError
from cairis.tools.JsonConverter import json_serialize
from cairis.tools.SessionValidator import get_session_id, get_model_generator
from importlib import import_module

__author__ = 'Shamal Faily'


class DataFlowByNameAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.DataFlowDAO'),'DataFlowDAO')

  def get(self, dataflow_name,environment_name):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    objt = dao.get_object_by_name(dataflow_name,environment_name)
    dao.close()
    resp = make_response(json_serialize(objt, session_id=session_id), OK)
    resp.headers['Content-type'] = 'application/json'
    return resp

  def put(self, dataflow_name,environment_name):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    objt = dao.from_json(request)
    dao.update_object(dataflow_name,environment_name,objt)
    dao.close()
    resp_dict = {'message': objt.name() + ' updated'}
    resp = make_response(json_serialize(resp_dict), OK)
    resp.headers['Content-type'] = 'application/json'
    return resp

  def delete(self, dataflow_name,environment_name):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    dao.delete_object(dataflow_name, environment_name)
    dao.close()
    resp_dict = {'message': dataflow_name + ' deleted'}
    resp = make_response(json_serialize(resp_dict), OK)
    resp.headers['Content-type'] = 'application/json'
    return resp

class DataFlowDiagramAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.DataFlowDAO'),'DataFlowDAO')

  def get(self, environment_name,filter_type,filter_element):
    session_id = get_session_id(session, request)
    model_generator = get_model_generator()
    dao = self.DAOModule(session_id)
    if filter_element == 'all':
      filter_element = ''
    dot_code = dao.get_dataflow_diagram(environment_name,filter_type,filter_element)
    dao.close()
    resp = make_response(model_generator.generate(dot_code, model_type='dataflow',renderer='dot'), OK)
    accept_header = request.headers.get('Accept', 'image/svg+xml')
    if accept_header.find('text/plain') > -1:
      resp.headers['Content-type'] = 'text/plain'
    else:
      resp.headers['Content-type'] = 'image/svg+xml'
    return resp
