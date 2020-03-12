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
from cairis.tools.SessionValidator import get_session_id, get_model_generator
from importlib import import_module

__author__ = 'Robin Quetin, Shamal Faily'


class RiskAnalysisModelAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.RiskDAO'),'RiskDAO')

  def get(self, environment):
    session_id = get_session_id(session, request)
    model_generator = get_model_generator()
    dim_name = request.args.get('dimension_name', '')
    obj_name = request.args.get('object_name', '')
    isTagged = request.args.get('tagged', '0')
    orientation = request.args.get('orientation','Vertical')
    if (isTagged == '1'):
      isTagged = True
    else:
      isTagged = False
    model_layout = request.args.get('layout','Hierarchical')

    if dim_name == 'all': dim_name = ''
    if obj_name == 'all': obj_name = ''

    if model_layout == 'Hierarchical':
      renderer = 'dot'
    elif model_layout == 'Spring':
      renderer = 'fdp'
    elif model_layout == 'Radial':
      renderer = 'twopi'
    else:
      renderer = 'circo'

    rankDir = 'TB'
    if (orientation == 'Horizontal'):
      rankDir = 'LR'

    dao = self.DAOModule(session_id)
    dot_code = dao.get_risk_analysis_model(environment, dim_name, obj_name, renderer, isTagged, rankDir)
    dao.close()

    resp = make_response(model_generator.generate(dot_code, model_type='risk', renderer=renderer), OK)

    accept_header = request.headers.get('Accept', 'image/svg+xml')
    if accept_header.find('text/plain') > -1:
      resp.headers['Content-type'] = 'text/plain'
    else:
      resp.headers['Content-type'] = 'image/svg+xml'
    return resp


class RisksScoreByNameAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.RiskDAO'),'RiskDAO')

  def get(self, name, threat, vulnerability, environment):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    risk_scores = dao.get_scores_by_rtve(name, threat, vulnerability, environment)

    resp = make_response(json_serialize(risk_scores, session_id=session_id), OK)
    resp.contenttype = 'application/json'
    return resp


class RisksRatingByNameAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.RiskDAO'),'RiskDAO')

  def get(self, threat, vulnerability, environment):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    risk_rating = dao.get_risk_rating_by_tve(threat, vulnerability, environment)

    resp = make_response(json_serialize(risk_rating, session_id=session_id), OK)
    resp.contenttype = 'application/json'
    return resp

class RiskAnalysisModelNamesAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.RiskDAO'),'RiskDAO')

  def get(self, environment):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    element_names = dao.risk_model_elements(environment)
    resp = make_response(json_serialize(element_names, session_id=session_id), OK)
    resp.contenttype = 'application/json'
    return resp

class RisksSummaryAPI(Resource):

  def __init__(self):
    self.DAOModule = getattr(import_module('cairis.data.RiskDAO'),'RiskDAO')

  def get(self):
    session_id = get_session_id(session, request)
    dao = self.DAOModule(session_id)
    objts = dao.get_risks_summary()
    dao.close()
    resp = make_response(json_serialize(objts, session_id=session_id))
    resp.headers['Content-Type'] = "application/json"
    return resp
