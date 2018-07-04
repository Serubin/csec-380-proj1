require 'elasticsearch'
require 'hashie'

class SkitReplyController < ApplicationController
    # /AddSkitReply
    def addreply
        client = Elasticsearch::Client.new log: true, host: 'elk', port: 9200

        if !params['id']
            render json: {error: 'no skit id provided' }, status: :bad_request
        end

        if !params['skit']
            render json: {error: 'no skit content provided' }, status: :bad_request
        end

        reply_body = {
            skit: params['id'],
            user: 0,
            content: params['skit'],
            timestamp: DateTime.now.to_s
        }

        response = client.index index: 'skitreply', type: 'skit', body: reply_body

        # Pull down data code
        mash = Hashie::Mash.new response

        skit = mash # TODO do something with
        render json: { result: 201, id: skit._id }
    end

    def remreply
        client = Elasticsearch::Client.new log: true, host: 'elk', port: 9200

        if !params['id']
            render json: {error: 'no skit id provided' }, status: :bad_request
        end

        client.delete index: 'skitreply', type: 'skit', id: params['id']

        render json: { result: 204, id: params['id'] }
    end

    def getreply
        client = Elasticsearch::Client.new log: true, host: 'elk', port: 9200

        if !params['id']
            render json: {error: 'no skit id provided' }, status: :bad_request
        end

        response = client.search index: 'skitreply', type: 'skit', body: { query: { match: { skit: params['id'] } }
 }
        mash = Hashie::Mash.new response

        items = []

        for i in mash.hits.hits
                        i._source['id'] = i._id
            items.push(i._source)
        end

        render json: { result: 200, total: items.length, data: items }

    end

    def parse_request
         @json = JSON.parse(request.body.read)
    end

end
