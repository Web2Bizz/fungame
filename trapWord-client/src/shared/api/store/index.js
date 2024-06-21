import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { roomAPI } from '../../../entitys/Room/api/service'

const rootReducer = combineReducers({
	[roomAPI.reducerPath]: roomAPI.reducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(roomAPI.middleware),
	})
}
