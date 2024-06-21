import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roomAPI = createApi({
	tagTypes: ['Room'],
	reducerPath: 'roomAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL + '/rooms',
		keepalive: false,
	}),
	endpoints: builder => ({
		createRoom: builder.mutation({
			query: () => ({
				url: `/create`,
				method: 'POST',
			}),
		}),
		connectRoom: builder.mutation({
			query: body => ({
				url: `/join`,
				method: 'POST',
				body: body,
			}),
			invalidatesTags: ['Room'],
		}),
		checkRoomExistence: builder.query({
			query: params => ({
				url: `/exist/${params}`,
				method: 'GET',
			}),
		}),
		getPlayersInRoom: builder.query({
			query: params => ({
				url: `/${params}/players`,
				method: 'GET',
			}),
			providesTags: ['Room'],
		}),
	}),
})
