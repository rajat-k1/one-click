'use client'

import React from 'react'

import { createPortal } from 'react-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import RestartIcon from '@mui/icons-material/RestartAlt'
import AccountIcon from '@mui/icons-material/AccountCircle'
import ClearIcon from '@mui/icons-material/Clear'
import SendIcon from '@mui/icons-material/Send'
import ImageIcon from '@mui/icons-material/Image'
//import CloseIcon from '@mui/icons-material/HighlightOff'
import CloseIcon from '@mui/icons-material/Cancel'
import SettingsIcon from '@mui/icons-material/Settings'
import OpenAiIcon from '../../components/openailogo'

import Markdown from 'react-markdown'

import CustomTheme from '../../components/customtheme'
import LoadingText from '../../components/loadingtext'
import Loader from '../../components/loader'

import useDarkMode from '../../lib/usedarkmode'
import useCaption from '../../lib/usecaption'
import captions from '../../assets/captions.json'
//import useAppStore from '../stores/appstore'

import { welcome_greeting, getSimpleId, compact, formatTextQuickDirty, truncateText } from '../../lib/utils'

import classes from './sandbox.module.css'

const Sandbox = () => {

    useDarkMode()

    const [lang, setCaption] = useCaption(captions)

    const fileRef = React.useRef(null)
    const inputRef = React.useRef(null)
    const messageRef = React.useRef(null)

    const timerRef = React.useRef(null)

    const [inputFocus, setInputFocus] = React.useState(false)
    const [previewImage, setPreviewImage] = React.useState([])
    
    const [inputText, setInputText] = React.useState('')
    const [messageItems, setMessageItems] = React.useState([])
    const [isProcessing, setProcessing] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)
    
    React.useEffect(() => {

        welcome_greeting()

    }, [])
    
    const handleSubmit = async (e) => {

        clearTimeout(timerRef.current)

        e.preventDefault()

        setProcessing(true)

        const previous = messageItems.filter(item => item.type === 'text' && item.role !== 'error').map(item => {
            return {
                role: item.role,
                content: item.content
            }
        })

        const groupId = getSimpleId()

        const inquiry = inputText

        let newUserItem = {
            id: getSimpleId(),
            gid: groupId,
            role: 'user',
            content: inquiry,
            type: 'text',
            datetime: (new Date()).toISOString(),
        }

        if(previewImage.length > 0) {

            let uploaded_files = await Promise.all(
                Array.from(previewImage).map(async (image) => {

                    const formData = new FormData()
                    console.log(image.file, image.file.name);
                    formData.append('file', image.file)
                    formData.append('name', image.file.name)

                    try {

                        const response_upload = await fetch('/api/upload/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                            },
                            body: formData,
                        })

                        if(!response_upload.ok) {
                            console.log('From image')
                            console.log("Oops, an error occurred.", response_upload.status)
                        }

                        const result_upload = await response_upload.json()

                        //const _name = result_upload.name
                        //const _url = result_upload.url

                        return {
                            id: image.id,
                            //name: _name,
                            //_name: image.file.name,
                            //src: _url,
                            url: result_upload.url,
                            //_url: URL.createObjectURL(image.file),
                            //type: image.file.type,
                            //size: image.file.size,
                            base64: image.base64,
                            alt: image.file.name,
                        }

                    } catch(error) {
                        
                        return null

                    }

                })
            )
            uploaded_files = compact(uploaded_files)
            
            const image_markdown = uploaded_files.map((img) => {
                return `![${img.alt}](${img.url} "${img.id}")\n`
            })

            newUserItem.image = uploaded_files
            newUserItem.content = image_markdown + '\n\n' + newUserItem.content

            console.log("user-entry", newUserItem)

            setPreviewImage([])

        }

        setMessageItems((prev) => [...prev, ...[newUserItem]])

        setInputText('')
        inputRef.current.blur()
        resetScroll()

        try {
            console.log(JSON.stringify({
                lang,
                inquiry,
                previous,
                image: newUserItem.image && Array.isArray(newUserItem.image) && newUserItem.image.length > 0 ? newUserItem.image : [],
            }));
            const response = await fetch('/api/route', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lang,
                    inquiry,
                    previous,
                    image: newUserItem.image && Array.isArray(newUserItem.image) && newUserItem.image.length > 0 ? newUserItem.image : [],
                })
            })
            console.log(response);
            if(!response.ok) {
                console.log('From api/route')
                console.log('Oops, an error occurred', response.status)
            }

            const ret = await response.json()
            
            console.log("received response...", (new Date()).toLocaleTimeString())
            console.log(ret)

            let text = ret.result.content || setCaption('unexpected_error')
            
            let newAssistantItem = {
                id: getSimpleId(),
                gid: groupId,
                role: 'assistant',
                content: text,
                type: 'text',
                datetime: (new Date()).toISOString(),
            }

            if(ret.result.image && Array.isArray(ret.result.image) && ret.result.image.length > 0) {

                newAssistantItem.image = ret.result.image.map((img) => ({
                    id: getSimpleId(),
                    url: img.url,
                    alt: truncateText(img.alt),
                }))

                const output_image_markdown = newAssistantItem.image.map((img) => {
                    return `![${img.alt}](${img.url} "${img.id}")\n`
                })

                newAssistantItem.content = newAssistantItem.content + '\n\n' + output_image_markdown

            }

            setMessageItems((prev) => [...prev, ...[newAssistantItem]])
            
        } catch(error) {
            
            console.log(error.name, error.message)

            let newErrorItem = {
                id: getSimpleId(),
                gid: groupId,
                role: 'error',
                content: error.message,
                type: 'text',
                datetime: (new Date()).toISOString(),
            }

            setMessageItems((prev) => [...prev, ...[newErrorItem]])
            
        } finally {

            resetScroll(true)

            setProcessing(false)

        }

    }

    const resetScroll = (flag = false) => {

        const flagRefocus = flag

        setTimeout(() => {
            
            messageRef.current.scrollTop = messageRef.current.scrollHeight
            
            if(flagRefocus) {
                inputRef.current.focus()
            }

        }, 300)

    }

    const handleImage = () => {
        clearTimeout(timerRef.current)
        fileRef.current.click()
    }

    const handleFile = (e) => {

        if(e.target.files.length === 0) return

        setProcessing(true)

        const file = e.target.files[0]
        
        const reader = new FileReader()

        reader.onload = function() {
            
            const image = new Image()

            image.onload = function() {

                const newImage = {
                    id: Date.now(),
                    src: image.src, //
                    file: file,
                    _image: image, //
                    base64: reader.result,
                }

                setPreviewImage((prevImgs) => [...prevImgs, ...[newImage]])

                setProcessing(false)

            }

            image.onerror = function(error) {
                
                console.log('Load image', error)

                setProcessing(false)

            }

            image.src = reader.result

        }

        reader.onerror = function() {

            console.log('Error reading file')

            setProcessing(false)

        }

        reader.readAsDataURL(file)

    }

    const handleDeleteMessage = (gid) => {
        
        setMessageItems((prev) => prev.filter((item) => item.gid !== gid))

    }

    const handleDeleteImage = (id) => {
        
        setPreviewImage((prev) => prev.filter((img) => img.id !== id))

    }

    const handleReset = () => {

        setMessageItems([])

    }

    const handleBlur = () => {
        
        timerRef.current = setTimeout(() => {
            setInputFocus(false)
        }, 200)

    }

    const handleClear = () => {
        
        clearTimeout(timerRef.current)
        
        setInputText('')

    }

    const classBorderline = inputFocus ? classes.selected : classes.default

    return (
        <div className={classes.container}>
            <div className={classes.main}>
                <div className={classes.header}>
                    <h4 className={classes.title}>{process.env.siteTitle}</h4>
                </div>
                <div ref={messageRef} className={classes.messageList}>
                    {
                        messageItems.map((item) => {
                            return (
                                <div key={item.id} className={classes.messageItem}>
                                    {
                                        item.role === 'assistant' &&
                                        <div className={classes.systemIcon}>
                                            <OpenAiIcon />
                                        </div>
                                    }
                                    {
                                        item.role === 'error' &&
                                        <div className={classes.systemIcon}>
                                            <SettingsIcon />
                                        </div>
                                    }
                                    <div className={[classes.message, item.role === 'assistant' ? classes.assistant : item.role === 'error' ? classes.system : classes.user].join(' ')}>
                                        {
                                            (item.role === 'user' && item.image && Array.isArray(item.image) && item.image.length > 0) &&
                                            <div className={classes.imageList}>
                                            {
                                                item.image.map((img) => {
                                                    return (
                                                        <a className={classes.link} key={img.id} href={`${img.url}`} target="_blank">
                                                            <img className={classes.image} src={img.url} />
                                                        </a>
                                                    )
                                                })
                                            }
                                            </div>
                                        }
                                        {
                                            item.role === 'error' &&
                                            <p className={`${classes.text} ${classes.error}`}>{item.content}</p>
                                        }
                                        {
                                            item.role === 'errors' &&
                                            <div className={classes.mark}>
                                                <Markdown>{item.content}</Markdown>
                                            </div>
                                        }
                                        {
                                            item.role !== 'error' &&
                                            <p className={classes.text}>{ formatTextQuickDirty(item.content, item.image && Array.isArray(item.image) && item.image.length > 0) }</p>
                                        }
                                        {
                                            (item.role === 'assistant' && item.image && Array.isArray(item.image) && item.image.length > 0) &&
                                            <div className={classes.imageList}>
                                            {
                                                item.image.map((img) => {
                                                    return (
                                                        <a className={classes.link} key={img.id} href={`${img.url}`} target="_blank">
                                                            <img key={img.src} className={classes.image} src={img.url} alt={img.alt} />
                                                        </a>
                                                    )
                                                })
                                            }
                                            </div>
                                        }
                                        <div className={item.role !== 'user' ? classes.close2 : classes.close}>
                                            <CustomTheme>
                                                <IconButton disabled={isProcessing} onClick={() => handleDeleteMessage(item.gid)}>
                                                    <CloseIcon className={classes.closeIcon} sx={{fontSize: '1.2rem'}} />
                                                </IconButton>
                                            </CustomTheme>
                                        </div>
                                    </div>
                                    {
                                        item.role === 'user' &&
                                        <div className={classes.userIcon}>
                                            <CustomTheme>
                                                <AccountIcon />
                                            </CustomTheme>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        isProcessing &&
                        <div className={classes.loading}>
                            <LoadingText />
                        </div>
                    }
                </div>
            </div>
            <div className={classes.input}>
                
                    <div className={classes.retry} style={{
                        width: !inputFocus && messageItems.length > 0 ? '48px' : '0px',
                        marginLeft: !inputFocus && messageItems.length > 0 ? '1rem' : '0px'
                    }}>
                        {
                        !inputFocus && messageItems.length > 0 &&
                            <div className={classes.roundButton}>
                                <IconButton 
                                disabled={isProcessing}
                                size="large" onClick={handleReset}>
                                    <RestartIcon className={classes.restartIcon} fontSize="inherit" />
                                </IconButton>
                            </div>
                        }
                    </div>
                
                <div className={`${classes.chat} ${classBorderline}`}>
                    {
                        previewImage.length > 0 &&
                        <div className={classes.previewContainer}>
                            {
                                previewImage.map((img) => {
                                    return (
                                        <div className={classes.preview} key={img.id}>
                                            <img src={img.src} className={classes.previewImage} />
                                            <div className={classes.previewClose}>
                                                <IconButton 
                                                disabled={isProcessing}
                                                onClick={() => handleDeleteImage(img.id)}>
                                                    <ClearIcon className={classes.deleteIcon} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <CustomTheme>
                        <Box 
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate>
                            <TextField 
                            sx={{ "& fieldset": { border: 'none' } }}
                            placeholder={setCaption(messageItems.length > 1 ? 'send_reply' : 'send_message')}
                            disabled={isProcessing}
                            fullWidth
                            inputRef={inputRef}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onFocus={(() => setInputFocus(true))}
                            onBlur={handleBlur}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <IconButton 
                                        disabled={isProcessing || previewImage.length >= process.env.maxFileUploadCount}
                                        onClick={handleImage}>
                                            <ImageIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <React.Fragment>
                                            <IconButton
                                            disabled={isProcessing || inputText.length === 0}
                                            onClick={handleClear}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                            <IconButton
                                            disabled={isProcessing || inputText.length === 0}
                                            onClick={handleSubmit}
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </React.Fragment>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </Box>
                    </CustomTheme>
                    <input onChange={handleFile} accept='image/*' ref={fileRef} className={classes.file} type='file' />
                </div>
            </div>
            {
                isLoading && createPortal(
                    <Loader />,
                    document.body
                )
            }
        </div>
    )
}

export default Sandbox;