import Millennium, PluginUtils
import shutil
from pathlib import Path
from os import remove

LOGGER = PluginUtils.Logger()


class Plugin:

    def _agregarJavascript(self):
        jsPath = (Path(__file__).parents[2]) / "frontend" / "pesificar.js"
        steamPath = Path(Millennium.steam_path()) / "steamui"
        shutil.copy(jsPath, steamPath)
        LOGGER.log("Archivos copiados!")


    def _front_end_loaded(self):
        LOGGER.log("The front end has loaded!")

    def _load(self):
        self._agregarJavascript()   
        self.pluginID = Millennium.add_browser_js("pesificar.js")
        Millennium.ready()
        LOGGER.log(f"Steam en pesos cargado!")

    def _unload(self):
        Millennium.remove_browser_module(self.pluginID)
        jsPathSteam = steamPath = Path(Millennium.steam_path()) / "steamui" / "pesificar.js"
        remove(jsPathSteam)
        LOGGER.log("unloading")