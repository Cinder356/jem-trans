// src-tauri/src/config_loader.rs
use directories::BaseDirs;
use serde::Deserialize;
use std::env;
use std::fs;
use std::path::PathBuf;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct Settings {
    is_proxy_enabled: Option<bool>,
    proxy_protocol: Option<String>,
    proxy_user: Option<String>,
    proxy_pass: Option<String>,
    proxy_host: Option<String>,
    proxy_port: Option<String>,
}

pub fn init_env_from_settings() {
    if let Some(base_dirs) = BaseDirs::new() {
        let settings_file = base_dirs
            .data_dir()
            .join("com.daniil.jem-trans")
            .join("settings.json");

        println!("Trying to find settings file here: {:?}", settings_file);

        if settings_file.exists() {
            match read_and_parse(&settings_file) {
                Ok(settings) => {
                    if let (Some(true), Some(proxy_protocol), Some(proxy_host), Some(proxy_port)) = (
                        settings.is_proxy_enabled,
                        &settings.proxy_protocol,
                        &settings.proxy_host,
                        &settings.proxy_port,
                    ) {
                        let auth_part = match (&settings.proxy_user, &settings.proxy_pass) {
                            (Some(u), Some(p)) if !u.is_empty() => format!("{}:{}@", u, p),
                            _ => "".to_string(), // Если данных нет, пустая строка не сломает URL
                        };

                        let proxy_url = format!(
                            "{}://{}{}:{}",
                            proxy_protocol, auth_part, proxy_host, proxy_port
                        );
                        env::set_var("HTTP_PROXY", &proxy_url);
                        env::set_var("HTTPS_PROXY", &proxy_url);
                        env::set_var("ALL_PROXY", &proxy_url);
                        env::set_var("NO_PROXY", "localhost,127.0.0.1");
                        println!(
                            "Proxy configured: {}://***:***@{}:{}",
                            proxy_protocol, proxy_host, proxy_port
                        );
                    }
                }
                Err(e) => eprintln!("settings.json reading error: {}", e),
            }
        } else {
            println!("Settings file was not found.");
        }
    }
}

fn read_and_parse(path: &PathBuf) -> Result<Settings, Box<dyn std::error::Error>> {
    let content = fs::read_to_string(path)?;
    let settings: Settings = serde_json::from_str(&content)?;
    Ok(settings)
}
