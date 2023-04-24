import "./code.css";
import { readClipboard, clearClipboard } from "../../utils/copy";
import { Button, Space, } from 'antd';
import React, { useState, useEffect, useMemo } from "react";


export default function GoogleCode({ codeLength = 6, onSave, saveLoading, onClose }) {
    let [codeData, setCodeData] = useState([]);
    let [codeRes, setCodeRes] = useState("");
    let inputArr= [];
    useMemo(() => {
        for (let index = 0; index < codeLength; index++) {
            inputArr.push({
                content: "",
                key: index
            })
        }
        setCodeData([...inputArr])
        setTimeout(() => {
            document.getElementById("input_0")?.focus()
        }, 100);
    }, []);

    useEffect(() => {
        if (codeData.length) {
            const code = codeData.map((item) => item.content).join("")
            if (code.length == codeLength) {
                setCodeRes(code)
                onSave(codeRes)
            }
        }
    }, [codeData])

    function onIpChange(e) {
        const index = e.target.dataset.key * 1;
        if (e.target.value !== "") {
            if (e.target.value.length > 1) return
            setCodeData(codeData.map((item) => {
                if (item.key == index) item.content = e.target.value;
                return item
            }))
            getFocus(index * 1 + 1)
        }
        // if (e.target.value === "") {
        //     if (index < 0) return
        //     setCodeData(codeData.map((item: any) => {
        //         if (item.key == index) item.content = "";
        //         return item;
        //     }))
        //     getFocus(index * 1 - 1)
        // } else {
        //     if (e.target.value.length > 1) return
        //     setCodeData(codeData.map((item: any) => {
        //         if (item.key == index) item.content = e.target.value;
        //         return item
        //     }))
        //     getFocus(index * 1 + 1)
        // }
    }

    function onDelete(e) {
        const index = e.target.dataset.key * 1;
        if (e.keyCode === 8) {
            if (index < 0) return
            setCodeData(codeData.map((item) => {
                if (item.key == index) item.content = "";
                return item;
            }))
            getFocus(index * 1 - 1)
        }
    }

    function getFocus(index) {
        clearClipboard()
        document.getElementById("input_" + index)?.focus()
    }

    function onOneClickPaste() {
        readClipboard().then((res) => {
            if (res && res.length == codeLength && /^[0-9]*$/.test(res)) {
                setCodeData(codeData.map((item, index) => {
                    item.content = res[index]
                    return item
                }));
                clearClipboard()
            }
        })
    }

    const inputEl = () => {
        let el = [];
        for (let index = 0; index < codeLength; index++) {
            el.push(
                <input value={codeData[index]?.content} id={"input_" + index} data-key={index}
                    key={index} className="code_input" onChange={onIpChange} onFocus={onOneClickPaste}
                    onKeyDown={onDelete} />
            )
        }
        return el
    }
    return (
        <>
            <div className="google_code_box">
                {inputEl()}
            </div>
            <Space style={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={() => { onClose() }} >取消</Button>
                <Button type="primary" loading={saveLoading} onClick={() => onSave(codeRes)}>保存</Button>
            </Space>
        </>
    )
}
