import { bind, execAsync, Variable } from "astal";
import { App, Astal, Gtk, Gdk, hook } from "astal/gtk4";
import Hyprland from "gi://AstalHyprland";

export const themeVar = Variable<string>("catppuccin");
export default function PowerActions() {
  const hyprland = Hyprland.get_default();

  return (
    <window
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.BOTTOM
      }
      keymode={Astal.Keymode.EXCLUSIVE}
      name={"PowerActions"}
      cssClasses={themeVar().as((s) =>
        s == "catppuccin"
          ? ["PowerActions", "catppuccin"]
          : ["PowerActions", "gruv"]
      )}
      application={App}
      monitor={bind(hyprland, "focusedMonitor").as((monitor) => monitor.id)}
      onKeyPressed={(self, keyval) => keyval === Gdk.KEY_Escape && self.hide()}
      margin={10}
    >
      <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
        <button cssClasses={["power"]} onClicked={() => execAsync("poweroff")}>
          <image iconName="system-shutdown-symbolic" />
        </button>
        <button cssClasses={["reboot"]} onClicked={() => execAsync("reboot")}>
          <image iconName="system-reboot-symbolic" />
        </button>
        <button
          cssClasses={["lock"]}
          onClicked={() => {
            execAsync("hyprlock");
            App.get_window("PowerActions")?.hide();
          }}
        >
          <image iconName="lock-symbolic" />
        </button>
        <button
          cssClasses={themeVar().as((t) =>
            t == "catppuccin" ? ["swap"] : ["swap", "active"]
          )}
          onClicked={() =>
            themeVar.set(themeVar.get() == "catppuccin" ? "gruv" : "catppuccin")
          }
        >
          <image iconName="arrow-symbolic" />
        </button>
      </box>
    </window>
  );
}
