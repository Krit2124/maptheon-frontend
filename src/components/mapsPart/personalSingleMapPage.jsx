import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

import { useServerMapOperationsStore, useServerTagOperationsStore } from 'store/store';

import favouriteImage from "../../assets/icons/Favourite.png";
import deleteImage from "../../assets/icons/Close.png";
import plusImage from "../../assets/icons/Plus.png";

export default function PersonalSingleMapPage() {
    const navigate = useNavigate();

    const { 
        urlToGetFullSizeImg,
        myMapSettings,
        updateMapName,
        updateMapDescription,
        updateMapPublicStatus,
        deleteMap,
    } = useServerMapOperationsStore();

    const { 
        tagsForMap,
        bindTagToMap,
        deleteTag, 
    } = useServerTagOperationsStore();

    const [mapId, setMapId] = useState('');
    const [mapName, setMapName] = useState('Название карты');
    const [likeAmount, setLikeAmount] = useState(0);
    const [mapDescription, setMapDescription] = useState('Описание карты');
    const [createdAt, setCreatedAt] = useState('13.05.2024');
    const [updatedAt, setUpdatedAt] = useState('14.05.2024');
    const [isMapPublic, setIsMapPublic] = useState(false);

    const [tags, setTags] = useState([]);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleDeleteTag = async (tagToDelete) => {
        const tagToDeleteObj = tags.find(tag => tag.name === tagToDelete);
        if (tagToDeleteObj) {
            try {
                await deleteTag(mapId, tagToDeleteObj.id);
                setTags(tags.filter(tag => tag.name !== tagToDelete));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleAddTag = () => {
        setIsAddingTag(true);
    };

    const handleTagInputBlur = async () => {
        if (newTag.trim()) {
            const trimmedTag = newTag.trim();
            if (!tags.find(tag => tag.name === trimmedTag)) {
                try {
                    toast(await bindTagToMap(trimmedTag, mapId));
                    const updatedTags = await tagsForMap(mapId);
                    setTags(updatedTags);
                } catch (e) {
                    console.log(e);
                }
            } else {
                toast('Тег уже существует');
            }
        }
        setNewTag('');
        setIsAddingTag(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice(0, 10);
    };

    useEffect(() => {
        const fetchMapSettings = async () => {
            try {
                const id = Cookies.get('idEditingMap');
                setMapId(id);
                const mapSettings = await myMapSettings(id);
                setMapName(mapSettings.name);
                setMapDescription(mapSettings.description);
                setLikeAmount(mapSettings.number_in_favourites);
                setCreatedAt(mapSettings.createdAt);
                setUpdatedAt(mapSettings.updatedAt);
                setIsMapPublic(mapSettings.is_public);
            } catch (e) {
                console.log(e);
            }
        };

        const fetchTags = async () => {
            try {
                const id = Cookies.get('idEditingMap');
                const newTags = await tagsForMap(id);
                setTags(newTags);
            } catch (e) {
                console.log(e);
            }
        }

        fetchMapSettings();
        fetchTags();
    }, []);

    const handleMapNameChange = async (newName) => {
        try {
            toast(await updateMapName(mapId, newName));
            setMapName(newName);
        } catch (e) {
            console.log(e);
        }
    };

    const handleMapDescriptionChange = async (newDescription) => {
        try {
            toast(await updateMapDescription(mapId, newDescription));
            setMapDescription(newDescription);
        } catch (e) {
            console.log(e);
        }
    };

    const handleMapPublicStatusChange = async () => {
        try {
            toast(await updateMapPublicStatus(mapId, !isMapPublic));
            setIsMapPublic(!isMapPublic);
        } catch (e) {
            console.log(e);
        }
    };

    const handleStartEdit = () => {
        navigate(`/editor`);
    };

    const handleDeleteMap = async () => {
        if (window.confirm("Вы действительно хотите удалить эту карту?")) {
            try {
                await deleteMap(mapId);
                navigate('/maps/personal/yours');
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className="container-fullScreen size-full-vertical-pagePercent-withHeader flex-row-c-c flex-gap-50">
                <div className="mapFillSizeImage">
                    <img src={urlToGetFullSizeImg + mapId + '.jpg'} alt="Карта" />
                </div>

                <div className='flex-col-sb-left flex-gap-30 container-mapInfo'>
                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <input 
                            type="text" 
                            value={mapName} 
                            onChange={(e) => setMapName(e.target.value)}
                            onBlur={() => handleMapNameChange(mapName)}
                            className="textInput-usual" 
                        />

                        <div className="flex-row-sb-c flex-gap-10">
                            <p>{likeAmount}</p>
                            <img src={favouriteImage} alt="Количество в избранном" className="size-image-small" />
                        </div>
                    </div>

                    <div className='size-full-horizontal-percent'>
                        <textarea 
                            value={mapDescription} 
                            onChange={(e) => setMapDescription(e.target.value)}
                            onBlur={() => handleMapDescriptionChange(mapDescription)}
                            rows={5}
                            className="textInput-usual size-full-horizontal-percent" 
                        />
                    </div>

                    <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                        <p>Дата создания: {formatDate(createdAt)}</p>
                        <p>Дата обновления: {formatDate(updatedAt)}</p>
                    </div>

                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <div className="flex-col-sb-left flex-gap-10">
                            <a href={urlToGetFullSizeImg + mapId + '.jpg'} download={`${mapName}.jpg`} type='image/jpeg' className="button-text-usual">Скачать изображение</a>
                            <button className="button-text-usual" onClick={handleStartEdit}>Перейти в редактор карты</button>
                        </div>

                        <div className="flex-col-sb-right flex-gap-10">
                            <button className="button-text-usual" onClick={handleDeleteMap}>Удалить карту</button>
                            <button 
                                className={`button-text-usual ${isMapPublic ? 'active' : ''}`} 
                                onClick={handleMapPublicStatusChange}
                            >
                                {isMapPublic ? 'Карта публичная' : 'Карта не публичная'}
                            </button>
                        </div>
                    </div>

                    <div className='flex-row-left-top flex-gap-15 flex-wrap'>
                        {tags.map((tag, index) => (
                            <div key={index} className='tagBox flex-row-sb-c flex-gap-5'>
                                <p>{tag.name}</p>
                                <button onClick={() => handleDeleteTag(tag.name)}><img src={deleteImage} alt="Удалить" /></button>
                            </div>
                        ))}
                        {isAddingTag ? (
                            <div className='tagBox flex-row-sb-c flex-gap-5'>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onBlur={handleTagInputBlur}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <div className='tagBox flex-row-sb-c flex-gap-5'>
                                <button onClick={handleAddTag}><img src={plusImage} alt="Добавить" /></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer theme="dark"/>
        </section>
    );
}