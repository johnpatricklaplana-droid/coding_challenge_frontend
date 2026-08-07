import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const CastWebView = WebView as any;

const EDITOR_HTML = (initialCode: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/clike/clike.min.js"></script>
  <style>
    html, body { margin: 0; padding: 0; height: 100%; background: #282a36; }
    .CodeMirror { height: 100%; font-size: 12px; }
  </style>
</head>
<body>
  <textarea id="editor">${initialCode.replace(/</g, '&lt;')}</textarea>
  <script>
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'text/x-java',
      theme: 'dracula',
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      autoCloseBrackets: true,
      matchBrackets: true,
    });

    editor.on('change', () => {
      window.ReactNativeWebView.postMessage(editor.getValue());
    });
  </script>
</body>
</html>
`;

interface Props {
    initialCode: string;
    onChangeCode: (code: string) => void;
}

export default function JavaEditorWebView({ initialCode, onChangeCode }: Props) {
    const htmlRef = useRef(EDITOR_HTML(initialCode));

    return (
        <View style={styles.container}>
            <CastWebView
                originWhitelist={['*']}
                source={{ html: htmlRef.current }}
                onMessage={(event: any) => onChangeCode(event.nativeEvent.data)}
                style={styles.webview}
                scrollEnabled={false}
                keyboardDisplayRequiresUserAction={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    webview: { flex: 1, backgroundColor: 'transparent' },
});