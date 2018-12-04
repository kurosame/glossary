## category

package-manager

## titles

npm
dependencies
package.json

## description

### dependencies

NPM レジストリに公開せず、プライベートで使う場合は、こちらに記載すれば良い  
NPM レジストリに公開する場合は、他者が`npm install`した際に dependencies に指定したパッケージがインストールされるので、  
ここにインストールする必要のない開発関係のパッケージなどを含めないようにする

### devDependencies

NPM レジストリに公開する場合で、他者がインストールする必要のない開発関係のパッケージなどはこちらに記載する

### peerDependencies

対象のパッケージが別パッケージの特定バージョンに依存している場合に記載する  
例えば eslint-xxx-plugin が eslist-yyy に依存していて、  
eslist-yyy は最新が v1.1.0 だが eslint-xxx-plugin では v1.0.0 を使いたい場合  
peerDependencies に`eslist-yyy: 1.0.0`と記載しておく  
この時に他者が eslint-xxx-plugin と依存パッケージの eslist-yyy をインストールして、eslist-yyy のバージョンが v1.1.0 とかだと警告を出す

### bundledDependencies

配列でパッケージを指定する（バージョン記載なし）  
`npm pack`により、tarball 形式（.tar, .tar.gz, .tgz） で圧縮し、それを他者が`npm install`した際に  
bundledDependencies に指定されたパッケージの依存関係を解決し、インストールする

### optionalDependencies

オプショナルなパッケージを記載する  
例えば Mac や Linux などの環境の違いによって依存パッケージが変わる場合など  
ここに指定したパッケージをコード内で使う場合は、コード内で動的に import するなどの対応が必要
