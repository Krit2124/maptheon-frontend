import { create } from "zustand";
import { fabric } from 'fabric-all-modules';
import axios from 'axios';

import UserService from '../services/UserService';
import MapService from "services/MapService";
import TagService from "services/TagService";
import { API_URL } from '../http';

import grassImage from "../assets/textures/grass.jpg";
import iceImage from "../assets/textures/ice.jpg";
import sandImage from "../assets/textures/sand.jpg";
import snowImage from "../assets/textures/snow.jpg";
import stoneTileImage from "../assets/textures/stoneTile.jpg";

import rock1Image from "../assets/objects/rock1.png";
import rock2Image from "../assets/objects/rock2.png";
import rock3Image from "../assets/objects/rock3.png";
import rock4Image from "../assets/objects/rock4.png";
import rock5Image from "../assets/objects/rock5.png";
import rock6Image from "../assets/objects/rock6.png";
import rock7Image from "../assets/objects/rock7.png";
import rock8Image from "../assets/objects/rock8.png";
import rock9Image from "../assets/objects/rock9.png";
import rock10Image from "../assets/objects/rock10.png";
import rock11Image from "../assets/objects/rock11.png";
import rock12Image from "../assets/objects/rock12.png";
import rock13Image from "../assets/objects/rock13.png";
import rock14Image from "../assets/objects/rock14.png";
import rock15Image from "../assets/objects/rock15.png";
import rock16Image from "../assets/objects/rock16.png";
import rock17Image from "../assets/objects/rock17.png";

import tree1Image from "../assets/objects/tree1.png";
import tree2Image from "../assets/objects/tree2.png";
import tree3Image from "../assets/objects/tree3.png";

export const useGeneralGraphicEditorStore = create((set)=> ({
    // Действия с графическим редактором
    isExportRequired: false,
    setIsExportRequired: (value) => set({ isExportRequired: value }),

    isSaveRequired: false,
    setIsSaveRequired: (value) => set({ isSaveRequired: value }),

    isObjectListVisible: false,
    setIsObjectListVisible: (value) => set({ isObjectListVisible: value }),

    // Требуется ли отмена последнего действия
    isUndoRequired: false,
    setIsUndoRequired: (value) => set({ isUndoRequired: value }),

    // Требуется ли возврат последнего действия
    isRedoRequired: false,
    setIsRedoRequired: (value) => set({ isRedoRequired: value }),

    // Настройка отображения панелей с настройками инструментов
    isToolSettingsPanelVisible: false,
    setIsToolSettingsPanelVisible: (value) => set({ isToolSettingsPanelVisible: value }),
  
    currentTool: null,
    setCurrentTool: (value) => set({ currentTool: value }),

    typeOfChoosenObject: null,
    setTypeOfChoosenObject: (value) => set({ typeOfChoosenObject: value }),

    // Настройка отображения горячих клавиш
    isHotkeysPanelVisible: false,
    setIsHotkeysPanelVisible: (value) => set({ isHotkeysPanelVisible: value }),

    // Сброс настроек
    setGeneralDefaultSettings: () => set({ 
        isObjectListVisible: false,
        isToolSettingsPanelVisible: false,
        currentTool: null,
        typeOfChoosenObject: null,
        isHotkeysPanelVisible: false,
    }),
}))

export const useTextureStore = create((set)=> ({
    // Список недавно использованных текстур
    recentlyUsedTextures: [
        grassImage,
        iceImage,
        sandImage,
        snowImage,
        stoneTileImage
    ],

    setRecentlyUsedTextures: (value) => set({ recentlyUsedTextures: value }),
}))

export const useObjectsStore = create((set)=> ({
    // Список недавно использованных текстур
    recentlyUsedObjects: [
        [
            rock1Image,
            rock2Image,
            rock3Image,
            rock4Image,
            rock5Image,
            rock6Image,
            rock7Image,
            rock8Image,
            rock9Image,
            rock10Image,
            rock11Image,
            rock12Image,
            rock13Image,
            rock14Image,
            rock15Image,
            rock16Image,
            rock17Image,
        ],
        [
            tree1Image,
            tree2Image,
            tree3Image,
        ],
      ],
      setRecentlyUsedObjects: (value) => set({ recentlyUsedObjects: value }),
}))

export const useCanvasSettingsStore = create((set)=> ({
    // Настройки холста
    canvasWidth: 800,
    setCanvasWidth: (value) => set({ canvasWidth: value }),
  
    canvasHeight: 600,
    setCanvasHeight: (value) => set({ canvasHeight: value }),
  
    canvasBackgroundIsColorMode: true,
    setCanvasBackgroundIsColorMode: (value) => set({ canvasBackgroundIsColorMode: value }),
  
    canvasBackgroundColor: '#ffffff',
    setCanvasBackgroundColor: (value) => set({ canvasBackgroundColor: value }),
  
    canvasBackgroundTexture: grassImage,
    setCanvasBackgroundTexture: (value) => set({ canvasBackgroundTexture: value }),
  
    filtersList: [
      { name: 'Без фильтра', filter: null },
      { name: 'Черно-белый', filter: new fabric.Image.filters.Grayscale() },
      { name: 'Сепия', filter: new fabric.Image.filters.Sepia() },
    ],
  
    filterSelected: { name: 'Без фильтра', filter: null },
    setFilterSelected: (value) => set({ filterSelected: value }),
  
    filterIntensity: 1,
    setFilterIntensity: (value) => set({ filterIntensity: value }),

    // Сброс настроек
    setCanvasDefaultSettings: () => set({ 
        canvasWidth: 800,
        canvasHeight: 600,
        canvasBackgroundIsColorMode: true,
        canvasBackgroundColor: '#ffffff',
        canvasBackgroundTexture: grassImage,
    }),
}))

export const useBrushSettingsStore = create((set)=> ({
    // Настройки кисти
    brushColorMode: 'color',
    setBrushColorMode: (value) => set({ brushColorMode: value }),
  
    brushTexture: grassImage,
    setBrushTexture: (value) => set({ brushTexture: value }),
  
    brushColor: '#000000',
    setBrushColor: (value) => set({ brushColor: value }),
  
    brushCurrentLayer: 'lower',
    setBrushCurrentLayer: (value) => set({ brushCurrentLayer: value }),
  
    brushThickness: 20,
    setBrushThickness: (value) => set({ brushThickness: value }),
  
    brushShape: 'round',
    setBrushShape: (value) => set({ brushShape: value }),
  
    brushOpacity: 1,
    setBrushOpacity: (value) => set({ brushOpacity: value }),
  
    brushSoftness: 1,
    setBrushSoftness: (value) => set({ brushSoftness: value }),

    // Сброс настроек
    setBrushDefaultSettings: () => set({ 
        brushColorMode: 'color',
        brushTexture: grassImage,
        brushColor: '#000000',
        brushCurrentLayer: 'lower',
        brushThickness: 20,
        brushShape: 'round',
        brushOpacity: 1,
        brushSoftness: 1,
    }),
}))

export const useLabelSettingsState = create((set) => ({
    // Настройки подписи
    labelText: '',
    setLabelText: (value) => set({ labelText: value }),

    labelFontSize: 20,
    setLabelFontSize: (value) => set({ labelFontSize: value }),
  
    labelCharSpacing: 0.5,
    setLabelCharSpacing: (value) => set({ labelCharSpacing: value }),
  
    labelLineHeight: 1,
    setLabelLineHeight: (value) => set({ labelLineHeight: value }),
  
    labelRotation: 0,
    setLabelRotation: (value) => set({ labelRotation: value }),
  
    labelBorderWidth: 0,
    setLabelBorderWidth: (value) => set({ labelBorderWidth: value }),

    labelFont: 'Times New Roman',
    setLabelFont: (value) => set({ labelFont: value }),

    labelColor: '#000000',
    setLabelColor: (value) => set({ labelColor: value }),

    labelBorderColor: '#000000',
    setLabelBorderColor: (value) => set({ labelBorderColor: value }),

    labelIsBold: false,
    setLabelIsBold: (value) => set({ labelIsBold: value }),

    labelIsItalic: false,
    setLabelIsItalic: (value) => set({ labelIsItalic: value }),

    labelAlign: 'left',
    setLabelAlign: (value) => set({ labelAlign: value }),

    labelOpacity: 1,
    setLabelOpacity: (value) => set({ labelOpacity: value }),

    labelSelected: null,
    setLabelSelected: (value) => set({ labelSelected: value }),

    // Сброс настроек
    setLabelDefaultSettings: () => set({ 
        labelText: '',
        labelFontSize: 20,
        labelCharSpacing: 0.5,
        labelLineHeight: 1,
        labelRotation: 0,
        labelBorderWidth: 0,
        labelFont: 'Times New Roman',
        labelColor: '#000000',
        labelBorderColor: '#000000',
        labelIsBold: false,
        labelIsItalic: false,
        labelAlign: 'left',
        labelOpacity: 1,
        labelSelected: null,
    }),
}));

export const useObjectSettingsState = create((set) => ({
    // Настройки объекта
    objectIsUseRandom: true,
    setObjectIsUseRandom: (value) => set({ objectIsUseRandom: value }),

    objectSize: 50,
    setObjectSize: (value) => set({ objectSize: value }),

    objectOpacity: 1,
    setObjectOpacity: (value) => set({ objectOpacity: value }),

    objectRotation: 0,
    setObjectRotation: (value) => set({ objectRotation: value }),

    objectSaturation: 0.1,
    setObjectSaturation: (value) => set({ objectSaturation: value }),

    objectBrightness: 0,
    setObjectBrightness: (value) => set({ objectBrightness: value }),

    objectContrast: 0,
    setObjectContrast: (value) => set({ objectContrast: value }),

    objectIsHorizontalMirrored: false,
    setObjectIsHorizontalMirrored: (value) => set({ objectIsHorizontalMirrored: value }),

    objectIsVerticalMirrored: false,
    setObjectIsVerticalMirrored: (value) => set({ objectIsVerticalMirrored: value }),

    objectSelected: null,
    setObjectSelected: (value) => set({ objectSelected: value }),

    // Сброс настроек
    setObjectDefaultSettings: () => set({ 
        objectIsUseRandom: true,
        objectSize: 50,
        objectOpacity: 1,
        objectRotation: 0,
        objectSaturation: 0.1,
        objectBrightness: 0,
        objectContrast: 0,
        objectIsHorizontalMirrored: false,
        objectIsVerticalMirrored: false,
        objectSelected: null,
    }),
}));

export const useSearchFieldStore = create((set)=> ({
    textToFind: "",
    setTextToFind: (value) => set({ textToFind: value }),

    sortByField: 'updatedAt',
    setSortByField: (value) => set({ sortByField: value }), 

    sortCapture: 'Недавние',
    setSortCapture: (value) => set({ sortCapture: value }),
}))

export const useUserStore = create((set) => ({
    user: {},
    isAuth: false,
    isLoading: false,

    login: async (emailOrUsername, password) => {
        try {
            const response = await UserService.login(emailOrUsername, password);
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
            return {
                isSuccess: true,
                message: 'Авторизация прошла успешно',
            };
        } catch (e) {
            console.log(e.response?.data?.message);
            return {
                isSuccess: false,
                message: e.response.data.message,
            };;
        }
    },

    registration: async (username, email, password) => {
        try {
            const response = await UserService.registration(username,email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
            return {
                isSuccess: true,
                message: 'Регистрация прошла успешно',
            };
        } catch (e) {
            console.log(e.response?.data?.message);
            return {
                isSuccess: false,
                message: e.response.data.message,
            };
        }
    },

    logout: async () => {
        try {
            await UserService.logout();
            localStorage.removeItem('token');
            set({ isAuth: false, user: {} });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            set({ isLoading: false });
        }
    },

    getProfileInfo: async (id_user) => {
        try {
            const userInfo = await UserService.getProfileInfo(id_user);
            return userInfo.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },
}));

export const useServerMapOperationsStore = create((set)=> ({
    urlToGetPreviewImg: process.env.REACT_APP_IMG_URL + '/mapsPreviews/',
    urlToGetFullSizeImg: process.env.REACT_APP_IMG_URL + '/mapsFullSize/',

    // Функция получения списка всех карт
    // Получаемые поля: id, name, id_creator, creator_name, number_in_favourites, wasFavourite
    allMaps: async (textToFind, sortByField) => {
        try {
            const maps = await MapService.allMaps(textToFind, sortByField);
            return maps.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция получения списка карт текущего пользователя
    // Получаемые поля: id, name, updatedAt
    myMaps: async (textToFind, sortByField) => {
        try {
            const maps = await MapService.myMaps(textToFind, sortByField);
            return maps.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция получения списка карт текущего пользователя
    // Получаемые поля: maps (id, name, number_in_favourites, wasFavourite), userInfo (id, username, description)
    userMaps: async (id_user, textToFind, sortByField) => {
        try {
            const userMapsData = await MapService.userMaps(id_user, textToFind, sortByField);
            return userMapsData.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция получения информации о карте любого пользователя
    // Получаемые поля: id, name, creator_name, description, number_in_favourites, wasFavourite, createdAt, updatedAt
    userMapInfo: async (id_map, id_user) => {
        try {
            const userMapsData = await MapService.userMapInfo(id_map, id_user);
            console.log(userMapsData.data);
            return userMapsData.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция получения настроек карты для её редактирования
    // Получаемые поля: id, name, description, number_in_favourites, is_public, createdAt, updatedAt
    myMapSettings: async (id_map) => {
        try {
            const mapSettings = await MapService.myMapSettings(id_map);
            return mapSettings.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция сохранения названия карты
    // Получаемые данные: сообщение о состоянии запроса
    updateMapName: async (id_map, newName) => {
        try {
            const message = await MapService.updateMapName(id_map, newName);
            return message.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },

    // Функция сохранения описания карты
    // Получаемые данные: сообщение о состоянии запроса
    updateMapDescription: async (id_map, newDescription) => {
        try {
            const message = await MapService.updateMapDescription(id_map, newDescription);
            return message.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },

    // Функция сохранения статуса публичности карты
    // Получаемые данные: сообщение о состоянии запроса
    updateMapPublicStatus: async (id_map, newPublicStatus) => {
        try {
            const message = await MapService.updateMapPublicStatus(id_map, newPublicStatus);
            return message.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },

    // Функция получения данных карты для продолжения работы с ней
    // Получаемые поля: data (в формате JSON)
    myMapData: async (id_map) => {
        try {
            const mapData = await MapService.myMapData(id_map);
            return mapData;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция сохранения данных карты
    // Получаемые данные: сообщение о состоянии запроса
    saveMapData: async (id_map, data, mapImage) => {
        try {
            const savedMapId = await MapService.saveMapData(id_map, data, mapImage);
            return savedMapId.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },

    // Функция для удаления карты
    // Получаемые данные: сообщение о состоянии запроса
    deleteMap: async (id_map) => {
        try {
            const message = await MapService.deleteMap(id_map);
            return message;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },

    // Функция для получения избранных карт
    // Получаемые поля: id, name, id_creator, creator_name, number_in_favourites, wasFavourite
    allFavouriteMaps: async (textToFind, sortByField) => {
        try {
            const maps = await MapService.allFavouriteMaps(textToFind, sortByField);
            return maps.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция для добавления карты в избранное
    // Получаемые данные: новое количество лайков (likes)
    addMapToFavourite: async (id_map) => {
        try {
            const likes = await MapService.addMapToFavourite(id_map);
            return likes.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },

    // Функция для удаления карты из избранного
    // Получаемые данные: новое количество лайков (likes)
    deleteMapFromFavourite: async (id_map) => {
        try {
            const likes = await MapService.deleteMapFromFavourite(id_map);
            return likes.data;
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },
}))

export const useServerTagOperationsStore = create((set)=> ({
    // Функция получения списка тегов для выбранной карты
    // Получение записей из таблицы tags
    tagsForMap: async (id_map) => {
        try {
            const tags = await TagService.tagsForMap(id_map);
            return tags.data;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },
    
    // Функция привязки тега к карте
    bindTagToMap: async (tag_name, id_map) => {
        try {
            await TagService.bindTagToMap(tag_name, id_map);
            return 'Данные успешно сохранены';
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция удаления привязки тега к карте (и удаления тега, если он никем не используется)
    deleteTag: async (id_map, id_tag) => {
        try {
            await TagService.deleteTag(id_map, id_tag);
            return 'Данные успешно удалены';
        } catch (e) {
            console.log(e.response?.data?.message);
            return (e.response?.data?.message);
        }
    },
}))